import { NgModule, DoBootstrap, ApplicationRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from '@Core/core.module';
import { RoutingModule } from '@View/routing.module';
import { EntrypointComponent } from './entrypoint.component';

@NgModule({
  declarations: [ EntrypointComponent ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'cordovaApp' }),
    CoreModule,
    RoutingModule
  ],
  exports: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class EntrypointModule implements DoBootstrap {

  ngDoBootstrap(appRef: ApplicationRef): void {
    appRef.bootstrap(EntrypointComponent);
  }

}
