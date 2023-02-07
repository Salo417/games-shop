import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillPageRoutingModule } from './bill-routing.module';

import { BillPage } from './bill.page';
import { ElectricityBillComponent } from './components/electricity-bill/electricity-bill.component';
import { BillListComponent } from './components/bill-list/bill-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillPageRoutingModule
  ],
  declarations: [
    BillPage, 
    ElectricityBillComponent,
    BillListComponent
  ]
})
export class BillPageModule {}
