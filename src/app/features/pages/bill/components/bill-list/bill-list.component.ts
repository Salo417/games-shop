import { Component, OnInit } from '@angular/core';
import { ElectricityBillComponent } from '../electricity-bill/electricity-bill.component';
import { IBillsData } from '../../classes/bills-data-interface';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss'],
})
export class BillListComponent implements OnInit {
  billComp = ElectricityBillComponent;
  billsList: IBillsData[];

  constructor() { }

  ngOnInit() {
    let tmpBillList: IBillsData[] =[
      {
        date: new Date(2000, 4, 20),
        id: 1
      },
      {
        date: new Date(),
        id: 2
      },
      {
        date: new Date(2022, 9, 31),
        id: 3
      },
      {
        date: new Date(2022, 9, 31),
        id: 4
      }
    ];

    this.billsList = tmpBillList
    .sort( (a: IBillsData, b: IBillsData): number => {
      let dif: number = 0;

      if (a.date.getTime() < b.date.getTime()) {
        dif = 1;
      } else if (a.date.getTime() > b.date.getTime()) {
        dif = -1;
      } else {
        if (a.id < b.id) {
          dif = -1;
        } else {
          dif = 1;
        }
      }

      return dif;
    });
  }

}
