import { fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { File } from '@awesome-cordova-plugins/file/ngx';

import { CoreServicesModule } from '@Core/services/services.module';

import { CapturedPhoto, PhotoService } from './photo.service';
import { firstValueFrom } from 'rxjs';


describe('PhotoService', () => {
  let service: PhotoService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let fileSvc: File;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ CoreServicesModule, HttpClientTestingModule ]
    });

    service = TestBed.inject(PhotoService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fileSvc = TestBed.inject(File);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#addNewToGallery should capture a picture and save it into _photos.', async () => {
    await service.addNewToGallery();
    expect((await firstValueFrom(service.photos)).length).toBe(0);
  });



});
