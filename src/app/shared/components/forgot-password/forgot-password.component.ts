import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  @Input() isVisible:boolean = false;
  @Output() toggle = new EventEmitter<boolean>();

  /* Forgot password form  */
  forgotPasswordForm = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email])
  });
  get form() { return this.forgotPasswordForm.controls; }
  /* Forgot password form  */  

/* Messages */
  message = {
    type:null,
    message:null
  };
/* Messages */  

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  handleOk(){
    this.authService.forgotPassword(this.forgotPasswordForm.value['email']).then(()=>{
      this.message.type = 'success';
      this.message.message = 'Se le ha enviado un correo electrónico para que pueda modificar su contraseña.';      
      setTimeout(()=>this.handleCancel(), 3000);
    }).catch(error=>{
      console.error(error);
     this.message.type =  'error';
     this.message.message =  this.authService.errorMessages(error.code);
    })
  }

  handleCancel(){
    this.message = {
      type:null,
      message:null
    };
    this.forgotPasswordForm.reset();
    this.toggle.emit(false);
  }
}
