import { Directive, Input } from '@angular/core';
import { AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[validImageFormat]',
  providers: [{provide: NG_VALIDATORS, useExisting: ImageFormatValidator, multi: true}]
})
export class ImageFormatValidator implements Validator {
  @Input('formats') formats: string[] = [];

  // CONSTRUCTOR
  constructor() { }


  // METHODS
  /**
   * @description
   * Validator for FormsControls that checks if the image has the provided by parameters formats.
   * 
   * This static method returns a high order function to check it and if the image has 
   * the correct format; it does not return `null`, otherwise it returns `ValidatorError` (an error).
   * 
   * @usageNotes 
   * ```typescript
   * const validator = new FormControl(catsImage, ImageFormatValidator.validImageFormat(['.jpeg', '.jpg', '.png']) );
   * 
   * consol.log(validator.errors);
   * ```
   * 
   * @param formats An array of `strings[]` with the list of all image formats that you want to complete.
   * @returns `null` if image matches with formats provided by parameters or an error if not in form of `ValidatorErro`.
   * @see [Validating input in Reactive Forms](https://angular.io/guide/form-validation#validating-input-in-reactive-forms)
   */
  static validImageFormat(formats: string[]): ValidatorFn {
    return (control: AbstractControl<File, any>): ValidationErrors | null => {
      let error: ValidationErrors | null = null;

      if (control.value != null  ||  control.value != undefined) {
        let valid = false;
        for (const i of formats) {
          if ( control.value.name.endsWith(i) ) {
            valid = true;
            break;
          }
        }

        if (!valid) error = {msgError: 'Image format is not valid.'}
      }
  
      return error;
    }
  }

  validate(control: AbstractControl<File, any>): ValidationErrors | null {
    return ImageFormatValidator.validImageFormat(this.formats)(control);
  }

  registerOnValidatorChange?(fn: () => void): void { }

}
