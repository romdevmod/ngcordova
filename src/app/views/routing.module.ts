import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CoreModule } from '@Core/core.module';

import { RootViewComponent } from "./root-view.component";

@NgModule({
  declarations: [ RootViewComponent ],
  exports: [],
  imports: [
    CoreModule,
    RouterModule.forRoot([
      {
        path: '',
        component: RootViewComponent,
        children: []
      }
    ])
  ]
})
export class RoutingModule {}
