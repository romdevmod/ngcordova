import { Component, OnInit } from '@angular/core';
import { PhotoService, CapturedPhoto } from '@Core/services/photo.service';

@Component({
  selector: 'home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {
  photos: CapturedPhoto[] = [];

  addPhotoToGallery() {
    this.photoSvc.addNewToGallery();
  }

  ngOnInit(): void {
    this.photoSvc.photos.subscribe(capturedPhotos => this.photos = capturedPhotos);
  }

  constructor(
    private photoSvc: PhotoService
  ) {}

}
