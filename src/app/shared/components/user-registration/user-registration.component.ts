import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  @Input() isVisible:boolean= true;
  @Output() toggle = new EventEmitter<boolean>();

  /* User registration form */
  userRegistrationForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    surname: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    passwordConfirmation: new FormControl('',[Validators.required])
  });
  /* User registration form */  

  /* Password confirmation error */
  passwordConfirmationError:boolean = false;
  /* Password confirmation error */

  /* General error message  */  
  errorMessage:string = '';
  /* General error message  */

  /* Success message */  
  successfulRegistration:boolean = false;
  successMessage:string = 'Felicidades! Usted ha sido registrado exitosamente.';
  /* Success message */

  constructor(private fireauth:AngularFireAuth) { }

  ngOnInit(): void {
  }

  handleOk(){
    let name = this.userRegistrationForm.get('name').value;
    let surname =  this.userRegistrationForm.get('surname').value;
    let displayName = name + ' ' + surname;

    let email = this.userRegistrationForm.get('email').value;
    let password = this.userRegistrationForm.get('password').value;
    let passwordConFirmation = this.userRegistrationForm.get('passwordConfirmation').value;
    
    if(!(password != passwordConFirmation)){
      this.passwordConfirmationError = false;
      this.fireauth.createUserWithEmailAndPassword(email,password).then((data)=>{
        
        data.user.updateProfile({
          displayName: displayName          
        });
        
        /* Envío de correo de validación */
        data.user.sendEmailVerification().then()
        /* Envío de correo de validación */

        this.errorMessage = '';
        this.successfulRegistration = true;
        setTimeout(()=>{this.toggle.emit(false);},5000);
        
      }).catch(error=>{
        this.errorMessage = error.message;
        console.error(error);
      });      
    }else{
      this.passwordConfirmationError = true;
    }
    
  }
  handleCancel(){
    this.toggle.emit(false);
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
