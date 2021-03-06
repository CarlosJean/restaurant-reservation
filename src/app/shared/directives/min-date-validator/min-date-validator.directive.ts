import { Directive } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appMinDateValidator]'
})
export class MinDateValidatorDirective {

  constructor() { }

  minDateValidate(control:AbstractControl): {[key: string]: any} | null{
    let currentDate = new Date().getTime();
    return ( control.value == null || control.value.getTime() < currentDate) ? {invalidDate: true} : null;   
  }
}
