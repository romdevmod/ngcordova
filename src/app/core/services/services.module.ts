import { NgModule } from '@angular/core';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { Push } from '@awesome-cordova-plugins/push/ngx';

@NgModule({
  declarations: [],
  providers: [ Vibration, Camera, Push ],
  exports: [],
  imports: []
})
export class CoreServicesModule {}
