import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
/* Services */
import {AuthService} from '../../../services/auth/auth.service';
/* Services */
/* Modal */
import { FormGroup, FormControl, Validators } from '@angular/forms';
/* Modal */

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

  message={
    type:null,
    message:null
  }

  /* Forgot password modal */
  forgotPasswordVisible:boolean = false;
  /* Forgot password modal */

  keepSessionActive:boolean = true;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.isVisible = false;
  }  

  handleOk(): void {  
    
    this.authService.authPersistence(this.keepSessionActive).then(()=>{
      let email = this.loginForm.value['email'];
      let password = this.loginForm.value['password'];
  
      this.authService.emailAndPasswordAuth(email,password).then((data)=>{
        if(data.user.emailVerified){          
          this.handleCancel();
        }else{
          this.message.type='error';
          this.message.message = this.authService.errorMessages('auth/email-not-verified');
          this.authService.logout().then(()=>{}).catch(error=>console.log(error)); //Se ejecuta esta función porque 'emailAndPasswordAuth guarda una sesión y hay que eliminarla para evitar conflictos.'
        }
      }).catch(error=>{
        console.error(error);
        this.message.type = 'error';
        this.message.message = this.authService.errorMessages(error.code);
      });
      
    }).catch(error=>{
      console.log(error);
    });
  }

  handleCancel(): void {    
    this.loginForm.reset();
    this.message={
      type:null,
      message:null
    }
    this.toggle.emit(false);
  }

  googleAuth():void{
    this.authService.authPersistence(this.keepSessionActive).then(()=>{
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

  facebookAuth(){
    this.authService.authPersistence(this.keepSessionActive).then(()=>{
      this.authService.facebookAuth().then(data=>{

        if(data.user.emailVerified){
          this.handleCancel();
        }else{
          /* Envío de correo de validación */
          data.user.sendEmailVerification().then(()=>{
            this.message.type = 'success';
            this.message.message = `Felicidades ${name}! Usted ha sido registrado exitosamente. Le enviaremos un correo para que pueda activar su cuenta.`;  
          }).catch(error=>{
            console.log(error);
          })
          /* Envío de correo de validación */
          this.authService.logout().then(()=>{}).catch(error=>console.log(error)); //Se ejecuta esta función porque 'emailAndPasswordAuth guarda una sesión y hay que eliminarla para evitar conflictos.'
        }      
        
      }).catch(error=>{
        console.error(error);
        this.message.type = 'error';
        this.message.message = this.authService.errorMessages(error.code);
        
      })
    }).catch(error=>{
      console.error(error);
    })
    
  }

  microsoftAuth(){
    this.authService.authPersistence(this.keepSessionActive).then(data=>{
      console.log(data);
      this.authService.microsoftAuth().then(microsoftData=>console.log(microsoftData)).then(error=>console.error(error));
    }).catch(error=>{
      console.error(error);
    });
    
  }

  forgotPasswordToggle(show:boolean){
    this.forgotPasswordVisible = show;
  }
}