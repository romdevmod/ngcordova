import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@Core/core.module';

import { ContactViewComponent } from './contact-view.component';

@NgModule({
  declarations: [ ContactViewComponent ],
  imports: [
    CoreModule,
    RouterModule.forChild([
      {
        path: '',
        component: ContactViewComponent
      }
    ])
  ]
})
export class ContactViewModule { }
