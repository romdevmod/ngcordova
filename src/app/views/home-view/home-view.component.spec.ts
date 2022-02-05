import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreServicesModule } from '@Core/services/services.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { File } from '@awesome-cordova-plugins/file/ngx';

import { HomeViewComponent } from './home-view.component';


describe('HomeViewComponent', () => {
  let component: HomeViewComponent;
  let fixture: ComponentFixture<HomeViewComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let fileSvc: File;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ File ],
      imports: [ CoreServicesModule, HttpClientTestingModule ],
      declarations: [ HomeViewComponent ]
    })
    .compileComponents();

    fileSvc = TestBed.inject(File);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
