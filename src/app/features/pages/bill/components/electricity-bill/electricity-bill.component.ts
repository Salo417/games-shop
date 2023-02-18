import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-electricity-bill',
  templateUrl: './electricity-bill.component.html',
  styleUrls: ['./electricity-bill.component.scss'],
})
export class ElectricityBillComponent implements OnInit {
  telephone: string;
  @Input() date: string = "01/02/1999";
  // Temp
  @Output() addTelephone = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  // Temp
  changeTelephone() {
    this.addTelephone.emit(this.telephone);
  }

}
