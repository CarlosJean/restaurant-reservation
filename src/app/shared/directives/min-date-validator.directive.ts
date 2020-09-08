import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl, AsyncValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appMinDateValidator]'
})
export class MinDateValidatorDirective {

  constructor() { }

  minDateValidate(control:AbstractControl): {[key: string]: any} | null{
    let currentDate = new Date().getTime();
    return (control.value.getTime() < currentDate) ? {invalidDate: true} : null;   
  }
}
