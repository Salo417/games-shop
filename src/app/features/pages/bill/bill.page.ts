import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonNav } from '@ionic/angular';
import { BillListComponent } from './components/bill-list/bill-list.component';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.page.html',
  styleUrls: ['./bill.page.scss'],
})
export class BillPage implements OnInit {
  billList = BillListComponent;

  constructor() { }

  ngOnInit() {
  }

}
