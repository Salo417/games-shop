import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';


@Directive({
  selector: '[decimalValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: DecimalValidator, multi: true}]
})
export class DecimalValidator implements Validator {
  private _numDecimals!: number;   // The decimals amount that is allowed
  @Input('numDecimals') set numDecimals(numDecimals: number) { 
    ( DecimalValidator.validNumDecimals(numDecimals) ) ? this._numDecimals = numDecimals : { } 
  };


  constructor() { }


  private static validNumDecimals(number: number): boolean { return (number >= 0); }

  /**
   * Function that ckeck if a number has a valid decimals format of price.
   * @param numDecimals The decimals amount that is allowed.
   * @returns Null if it's correct, and error in other case.
   */
  static validPriceChecker(numDecimals: number): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
      // Strings array separated by '.'
      let values = (typeof(control.value) === 'number') ? String(control.value).split('.') : (control.value == undefined) ? null : control.value.split('.');
      let valid  = false;   // Define if value is valid

      // Ckeck if value has correct format
      if (values != undefined) {
        if (values.length == 1) {
          valid = true;
        } else if (values.length == 2) {
          if (values[1].length <= numDecimals) {
            valid = true;
          }
        }
      }
  
      return !valid ? {number: {value: control.value}} : null;
    }
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null { 
    return DecimalValidator.validPriceChecker(this.numDecimals)(control); 
  }

  registerOnValidatorChange?(fn: () => void): void { }

}

/*
 * Created by Salo417 (GitHub/email: schooldayssal@gmail.com) on Apr-13-2023.
 * This source code is governed by:
 * 
 * BSD 3-Clause License (That can be found in LICENCE file)
 *
 * Copyright (c) 2023, Salo417 (GitHub/email: schooldayssal@gmail.com)
 */