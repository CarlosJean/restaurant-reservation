import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
/* Services */
import {AuthService} from '../../../services/auth/auth.service';
/* Services */
/* Modal */
import { NzModalService } from 'ng-zorro-antd/modal';
import { HeaderComponent } from '../../layout/header/header.component';
import { database } from 'firebase';
import { FormGroup, FormControl, Validators } from '@angular/forms';
/* Modal */
/* Firebase */

/* Firebase */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { 

  @Input() isVisible:boolean;
  @Output() toggle = new EventEmitter<boolean>();

  /* Login form */ 
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  /* Login form */

  errorMessage:string='';

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.isVisible = false;
  }  

  handleOk(): void {  
    
    this.authService.authPersistence().then(()=>{
      let email = this.loginForm.value['email'];
      let password = this.loginForm.value['password'];
  
      this.authService.emailAndPasswordAuth(email,password).then((data)=>{
        if(data.user.emailVerified){
          this.loginForm.reset();
          this.errorMessage = '';
          setTimeout(()=>{this.toggle.emit(false)},3000);
        }else{
          this.errorMessage = this.errorMessages('auth/email-not-verified');
        }
      }).catch(error=>{
        console.log(error);
        this.errorMessage = this.errorMessages(error.code);
      });
      
    }).catch(error=>{
      console.log(error);
    });
  }

  handleCancel(): void {    
    this.toggle.emit(false);
  }

  googleAuth():void{
    this.authService.authPersistence().then(()=>{
      this.authService.googleAuth().then((userData)=>{
        if(userData.user.uid != null){
          this.handleCancel();
        }
      }).catch(error=>{
        console.error(error)
      })
    }).catch(error=>{
      console.error(error);
    });
  }  

  private errorMessages(errorCode:string){
    
    let errorMessage:string = '';
    switch(errorCode){
      case 'auth/wrong-password':{
        errorMessage = 'Correo electrónico o contraseña incorrecta.'
        break;
      }
      case 'auth/email-not-verified':{
        errorMessage = 'Aún no ha activado su cuenta. Por favor, revise su correo para activar su cuenta.'
        break;
      }
      case 'auth/user-not-found':{
        errorMessage = 'Este usuario aún no se ha registrado.'
        break;
      }
      case 'auth/invalid-email':{
        errorMessage = 'Ingrese un correo electrónico válido.'
        break;
      }
    }

    return errorMessage;
  }
}
