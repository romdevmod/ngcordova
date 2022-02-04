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
        children: [
          {
            path: '',
            loadChildren: () => import('@View/home-view/home-view.module').then(m => m.HomeViewModule)
          },
          {
            path: 'contact',
            loadChildren: () => import('@View/contact-view/contact-view.module').then(m => m.ContactViewModule)
          },
          {
            path: 'about',
            loadChildren: () => import('@View/about-view/about-view.module').then(m => m.AboutViewModule)
          }
        ]
      },
    ])
  ]
})
export class RoutingModule {}
