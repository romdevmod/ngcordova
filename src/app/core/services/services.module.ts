import { NgModule } from '@angular/core';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';


@NgModule({
  declarations: [],
  providers: [ Vibration, Camera ],
  exports: [],
  imports: []
})
export class CoreServicesModule {}
