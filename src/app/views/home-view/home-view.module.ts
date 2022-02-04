import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@Core/core.module';
import { HomeViewComponent } from './home-view.component';

@NgModule({
  declarations: [ HomeViewComponent ],
  imports: [
    CoreModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeViewComponent
      }
    ])
  ]
})
export class HomeViewModule { }
