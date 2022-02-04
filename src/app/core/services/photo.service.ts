import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { HttpClient } from '@angular/common/http';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Platform } from '@ionic/angular';
import { Observable, of, map, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private _photos: CapturedPhoto[] = [];

  get photos(): Observable<CapturedPhoto[]> {
    return of(this._photos);
  }

  private _cameraOptions: CameraOptions = {
    quality: 50,
    targetHeight: 300,
    targetWidth: 400,
    encodingType: this.cameraSvc.EncodingType.PNG,
    mediaType: this.cameraSvc.MediaType.PICTURE,
    destinationType: this.cameraSvc.DestinationType.DATA_URL
  };

  async addNewToGallery() {
    this.cameraSvc.getPicture(this._cameraOptions)
      .then((url: string) => this.onCameraSuccess(url))
      .catch(() => this.onCameraError());

  }

  async savePhoto() {  }

  async onCameraSuccess(capPhotoUrl: string) {
    const platformKeywords = new Set(this.platformSvc.platforms());
    const capturedPhoto: CapturedPhoto = {
      id: this._photos.length,
      photoUrl: `data:image/png;base64,${capPhotoUrl}`
    };

    this._photos.unshift(capturedPhoto);
  }

  onCameraError() {}

  constructor(
    private fileSvc: File,
    private httpClientSvc: HttpClient,
    private cameraSvc: Camera,
    private platformSvc: Platform) {}
}

export interface CapturedPhoto {
  id: number,
  photoUrl: string
}