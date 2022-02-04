// This code is for building the Angular environment.

const { writeFileSync, readFile, existsSync } = require('fs');
const path = require('path');

const isProduction = process.env.ENV_CONTEXT == 'prod' ? true : false;
const envPath = path.resolve(`./.env${ isProduction ? '.production' : '' }`);

require('dotenv').config();

async function main() {
  const APP_ENV = {};

  if (!existsSync(envPath)) writeFileSync(envPath, '');

  readFile(envPath, (error, data) => {
    if (error) return Promise.reject(error);
    else {
      const env = parseEnvDataBuffer(data);

      // loop through the parsed env entries
      for (const [ key, value ] of Object.entries(env)) APP_ENV[key] = value;

      writeParsedAppEnvToFile(APP_ENV);
    }
  });

}

function parseEnvDataBuffer(dataBlk) {
  const env = {};
  const fileContent = dataBlk.toString();

  for (const envOptionStr of fileContent.split('\n').filter(str => str.length)) {

    // exclude comments
    if (envOptionStr.trim().at(0) == '#') continue;

    const [ key, _value ] = envOptionStr.split('=', 2);
    const value = Number(_value);
    env[key] = isFinite(value) ? value : _value;
  }

  return env;
}

function writeParsedAppEnvToFile(APP_ENV = {}) {
  const contextMode = process.env.ENV_CONTEXT;

  const angularEnvironmentContent = `
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as \`zone.run\`, \`zoneDelegate.invokeTask\`.
 */
${ contextMode == 'dev' ? '' : '//' } import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

export const environment = {
  production: ${ contextMode == 'prod' ? 'true' : 'false' },
  ${ appendAngularEnv(APP_ENV) }
};
  `;

  writeFileSync(path.resolve(`./src/environments/environment${ contextMode == 'prod' ? '.prod' : '' }.ts`), angularEnvironmentContent);
}

function appendAngularEnv(APP_ENV) {
  let appEnv = [];

  for (const [ key, value ] of Object.entries(APP_ENV)) {
    appEnv.push(`${key}: ${ isFinite(Number(value)) ? value : `${ new Set([ 'false', 'true' ]).has(value) ? value : `'${value}'` }` }`);
  }

  return appEnv.join(',\n\t');
}

main().catch(console.error);
