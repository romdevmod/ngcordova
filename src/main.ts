import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { EntrypointModule } from './app/entrypoint.module';
import { environment } from '@Env';

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
  if (environment.production) enableProdMode();

  if (document.readyState === 'complete') {
    bootstrap();
  } else {
    document.addEventListener('DOMContentLoaded', bootstrap);
  }
}

function bootstrap() {
  platformBrowserDynamic().bootstrapModule(EntrypointModule).catch(err => console.error(err));
};
