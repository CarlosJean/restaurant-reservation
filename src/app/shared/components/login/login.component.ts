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

  errorMessage:string='';

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
          this.errorMessage = this.authService.errorMessages('auth/email-not-verified');
          this.authService.logout().then(()=>{}).catch(error=>console.log(error)); //Se ejecuta esta función porque 'emailAndPasswordAuth guarda una sesión y hay que eliminarla para evitar conflictos.'
        }
      }).catch(error=>{
        console.log(error);
        this.errorMessage = this.authService.errorMessages(error.code);
      });
      
    }).catch(error=>{
      console.log(error);
    });
  }

  handleCancel(): void {    
    this.loginForm.reset();
    this.errorMessage = '';
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

  forgotPasswordToggle(show:boolean){
    this.forgotPasswordVisible = show;
  }
}