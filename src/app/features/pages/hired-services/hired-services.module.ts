import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HiredServicesPageRoutingModule } from './hired-services-routing.module';

import { HiredServicesPage } from './hired-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HiredServicesPageRoutingModule
  ],
  declarations: [HiredServicesPage]
})
export class HiredServicesPageModule {}
