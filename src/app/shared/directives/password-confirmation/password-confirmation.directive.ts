import { Directive } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appPasswordConfirmation]'
})
export class PasswordConfirmationDirective {

  constructor() { }
  
  passwordConfirmation(control:AbstractControl,password:string): {[key: string]: any} | null{
    return (password != control.value) ? {wrongPassword: true} : null;   
  }

}
