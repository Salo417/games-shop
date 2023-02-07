import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnergyConsumtionPageRoutingModule } from './energy-consumtion-routing.module';

import { EnergyConsumtionPage } from './energy-consumtion.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnergyConsumtionPageRoutingModule
  ],
  declarations: [EnergyConsumtionPage]
})
export class EnergyConsumtionPageModule {}
