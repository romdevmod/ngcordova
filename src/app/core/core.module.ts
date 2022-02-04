import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CoreServicesModule } from '@Core/services/services.module';
import { CoreComponentsModule } from '@Core/components/components.module';

@NgModule({
  imports: [
    IonicModule.forRoot({ animated: true }),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule

  ],

  providers: [ CoreServicesModule ],

  exports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    CoreComponentsModule,
    CoreServicesModule
  ],
  schemas: []
})
export class CoreModule {}
