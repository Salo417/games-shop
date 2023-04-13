import { Directive, Input } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

/*
export function validPriceChecker(numDecimals: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let values = (typeof(control.value) === 'number') ? String(control.value).split('.') : control.value.split('.');
    let valid  = (values[1].length <= this.numDecimals);

    return !valid ? {number: {value: control.value}} : null;
  }
}
*/

@Directive({
  selector: '[appDecimalValidator]'
})
export class DecimalValidator implements Validator {
  @Input('numDecimals') numDecimals: number;


  constructor() { }


  static validPriceChecker(numDecimals: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let values = (typeof(control.value) === 'number') ? String(control.value).split('.') : control.value.split('.');
      let valid  = (values[1].length <= numDecimals);
  
      return !valid ? {number: {value: control.value}} : null;
    }
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    //let values = (typeof(control.value) === 'number') ? String(control.value).split('.') : control.value.split('.');
    //let valid  = (values[1].length <= this.numDecimals);

    return DecimalValidator.validPriceChecker(this.numDecimals)(control); //!valid ? {number: {value: control.value}} : null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }

}
