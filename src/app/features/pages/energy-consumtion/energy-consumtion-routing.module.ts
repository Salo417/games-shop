import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnergyConsumtionPage } from './energy-consumtion.page';

const routes: Routes = [
  {
    path: '',
    component: EnergyConsumtionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnergyConsumtionPageRoutingModule {}
