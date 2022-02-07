#!/usr/bin/bash

export NG_EXEC=$([[ $NG_EXEC ]] && echo $NG_EXEC || echo 'ng');
export CORDOVA_EXEC=$([[ $CORDOVA_EXEC ]] && echo $CORDOVA_EXEC || echo 'cordova');
export NODEMON_EXEC=$([[ $NODEMON_EXEC ]] && echo $NODEMON_EXEC || echo 'nodemon');

export CHROME_BIN=$([[ $CHROME_BIN ]] && echo $CHROME_BIN || echo $(which chromium));
export NODEMON_ENV=$([[ $NODEMON_ENV ]] && echo $NODEMON_ENV || echo 'watch');
export NODE_ENV=$([[ $NODE_ENV ]] && echo $NODE_ENV || echo 'development');
export CORDOVA_PLATFORM=$([ $CORDOVA_PLATFORM ] && echo $CORDOVA_PLATFORM || echo 'browser');
export NGBUILD_PID=$([ $NGBUILD_PID ] && echo $NGBUILD_PID || echo "/tmp/ngbuild-${CORDOVA_PLATFORM}_pid");

# Update the environment of the app.
([ "$ENV_CONTEXT" == 'dev' ] && npm run initial:dev || npm run initial:prod) &> /dev/null;

CHECK_IF_ANGULAR_CLI_EXISTS_ELSE_INSTALL_IT() {
  npx ng &> /dev/null; export NPX_RET_CODE=$?;
  which ng &> /dev/null; export WHICH_RET_CODE=$?;

  [ $NPX_RET_CODE -ne 0 ] && [ $WHICH_RET_CODE -ne 0 ] && npm i -g @angular/cli;
}

CHECK_IF_CORDOVA_CLI_EXISTS_ELSE_INSTALL_IT() {
  npx cordova &> /dev/null; export NPX_RET_CODE=$?;
  which cordova &> /dev/null; export WHICH_RET_CODE=$?;

  [ $NPX_RET_CODE -ne 0 ] && [ $WHICH_RET_CODE -ne 0 ] && npm i -g cordova;
}

CHECK_IF_NODEMON_CLI_EXISTS_AND_CREATE_NODEMON_CONFIG() {
  npx nodemon --help &> /dev/null; export NPX_RET_CODE=$?;
  which nodemon &> /dev/null; export WHICH_RET_CODE=$?;

  [ $NPX_RET_CODE -ne 0 ] && [ $WHICH_RET_CODE -ne 0 ] && npm i -D nodemon;
  [ $WHICH_RET_CODE -ne 0 ] && export NODEMON_EXEC="npx nodemon";

  export NODEMON_CONFIG=$(echo "
{
  \"verbose\": false,
  \"watch\": [ \"./www/*\" ],
  \"exec\": \"NODEMON_ENV=nodemon ./build-script.sh\",
  \"env\": {
    \"NG_EXEC\": \"$NG_EXEC\",
    \"CORDOVA_EXEC\": \"$CORDOVA_EXEC\",
    \"NODEMON_EXEC\": \"$NODEMON_EXEC\",
    \"NODE_ENV\": \"$NODE_ENV\",
    \"NGBUILD_PID\": \"$NGBUILD_PID\",
    \"CORDOVA_PLATFORM\": \"$CORDOVA_PLATFORM\"
  },
  \"events\": {
    \"quit\": \"npm run clean:$CORDOVA_PLATFORM &> /dev/null;\"
  }
}
  ");

  echo $NODEMON_CONFIG > ./nodemon.json;
}

CREATE_GITKEEP_FILE_IN_WWW() {
  # Create a .gitkeep file for the output folder.
  mkdir www &> /dev/null;
  touch www/.gitkeep &> /dev/null;
}

RERUN_IF_PLATFORM_NOT_INSTALLED() {
  [ $? -ne 0 ] && $CORDOVA_EXEC platform add $CORDOVA_PLATFORM;
  $CORDOVA_EXEC $([ $NODEMON_ENV == 'build' ] && echo 'build' || echo 'run') $CORDOVA_PLATFORM;
  CREATE_GITKEEP_FILE_IN_WWW;
}

# This subroutine starts the build and watch process of the Angular application.
#
build_angular_proj() {
  CHECK_IF_ANGULAR_CLI_EXISTS_ELSE_INSTALL_IT;

  # Create an updated config.xml for the app.
  node config.js;

  # Generate the environment variables from the .env file.
  node ./builder.js;

  # Build and watch the project if necessary.
  if [[ ! $NOWATCH ]]; then
    # Clean up previous build watch commmand.
    [ -f $NGBUILD_PID ] && eval "npm run clean:$CORDOVA_PLATFORM &> /dev/null;";

    $NG_EXEC build --watch --progress --configuration=$NODE_ENV --output-path=./www/ &

    # write the pid of the `ng build ...` command into a pid file to /tmp.
    echo $! > $NGBUILD_PID;
  else
    $NG_EXEC build --progress --configuration=$NODE_ENV --output-path=./www;
  fi;
}

# This uses the nodemon-cli which automatically watch for changes in the ./www build folder.
# !!! Nodemon must be installed either locally or in the project. !!!
nodemon_cordova_watch() {
  CHECK_IF_CORDOVA_CLI_EXISTS_ELSE_INSTALL_IT;
  CHECK_IF_NODEMON_CLI_EXISTS_AND_CREATE_NODEMON_CONFIG;

  eval "$NODEMON_EXEC --config ./nodemon.json";
}

# Builds the app either in debug or release mode.
build_platform() {
  # 1) Test the app
  npm test -- --no-watch --no-progress --browsers=ChromeHeadlessCI;

  export NG_TEST_RESULT=$?;

  # 2) Build the app
  [[ $NG_TEST_RESULT -eq 0 ]] && $CORDOVA_EXEC build $CORDOVA_PLATFORM $([ $NODE_ENV == 'production' ] && echo '--release' || echo '--debug');
  [[ $NG_TEST_RESULT -eq 0 ]] && RERUN_IF_PLATFORM_NOT_INSTALLED;
}

main() {
  if [ $NODEMON_ENV == 'run' ]; then
    nodemon_cordova_watch;
  elif [ $NODEMON_ENV == 'watch' ]; then
    build_angular_proj;
    sleep 10;
  elif [ $NODEMON_ENV == 'build' ]; then
    build_platform;
  elif [ $NODEMON_ENV == 'nodemon' ]; then
    # Run cordova then wait for a change or press any key to terminate the nodemon.
    $CORDOVA_EXEC run $CORDOVA_PLATFORM;
    RERUN_IF_PLATFORM_NOT_INSTALLED;
  fi
}

main;
