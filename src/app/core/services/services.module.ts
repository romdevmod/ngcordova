import { NgModule } from '@angular/core';

import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FilePath } from '@awesome-cordova-plugins/file-path/ngx';
import { Push } from '@awesome-cordova-plugins/push/ngx';

import { PhotoService } from '@Core/services/photo.service';

@NgModule({
  declarations: [],
  providers: [
    Camera,
    File,
    FilePath,
    Push,
    PhotoService
  ],
  exports: [],
  imports: []
})
export class CoreServicesModule {}
