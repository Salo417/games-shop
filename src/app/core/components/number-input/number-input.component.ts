import { CurrencyPipe } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { LocaleService } from 'src/app/core';
import { IonInput } from "@ionic/angular";

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
  providers: [CurrencyPipe]
})
export class NumberInputComponent implements OnInit {

  private static BACKSPACE_KEY = 'Backspace';
  private static BACKSPACE_INPUT_TYPE = 'deleteContentBackward';

  _amount:string = '';
  @ViewChild('dummyFacade', {static: false}) private dummyFacade: IonInput;

  @Input() precision: number;

  @Input() set amount(value){
    this._amount = value.toFixed(0);
  }

  @Output() amountEntered = new EventEmitter<number>();

  constructor(private currencyPipe: CurrencyPipe,
    private locale:LocaleService) { }

  ngOnInit() {
    if (this.amount && this.amount.trim() !== '') {
      
      this.amountEntered.emit(+this.amount);
    }
  }

  handleKeyUp(event: KeyboardEvent) {
    // this handles keyboard input for backspace
    if (event.key === NumberInputComponent.BACKSPACE_KEY) {
      this.delDigit();
    }
  }

  handleInput(event) {
    this.clearInput();
    // check if digit
    if (event.detail.data && !isNaN(event.detail.data)) {
      this.addDigit(event.detail.data);
    } else if (event.detail.inputType === NumberInputComponent.BACKSPACE_INPUT_TYPE) {
      // this handles numpad input for delete/backspace
      this.delDigit();
    }
  }

  private addDigit(key: string) {
    this._amount = this._amount + key;
    this.amountEntered.emit(+this._amount);
  }

  private delDigit() {
    this._amount = this._amount.substring(0, this._amount.length - 1);
    this.amountEntered.emit(+this._amount);
  }

  private clearInput() {
    this.dummyFacade.value = ''; // ensures work for mobile devices
    // ensures work for browser
    this.dummyFacade.getInputElement().then((native: HTMLInputElement) => {
      native.value = '';
    });
  }

  get formattedAmount(): string {
    return this.currencyPipe.transform(+this._amount / Math.pow(10, this.precision),'EUR', 'symbol', undefined, this.locale.locale);
  }

  openInput() {
    this.dummyFacade.setFocus();
  }

}