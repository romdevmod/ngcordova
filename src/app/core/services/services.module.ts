import { NgModule } from '@angular/core';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

import { PhotoService } from '@Core/services/photo.service';

@NgModule({
  declarations: [],
  providers: [ Camera, File, PhotoService ],
  exports: [],
  imports: []
})
export class CoreServicesModule {}
