import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HiredServicesPage } from './hired-services.page';

const routes: Routes = [
  {
    path: '',
    component: HiredServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HiredServicesPageRoutingModule {}
