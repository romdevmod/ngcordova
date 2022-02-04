import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@Core/core.module';
import { AboutViewComponent } from './about-view.component';

@NgModule({
  declarations: [ AboutViewComponent ],
  imports: [
    CoreModule,
    RouterModule.forChild([
      {
        path: '',
        component: AboutViewComponent
      }
    ])
  ]
})
export class AboutViewModule { }
