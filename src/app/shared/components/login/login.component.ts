import { Component, OnInit, Input } from '@angular/core';

/* Services */
import {AuthService} from '../../../services/auth/auth.service';
/* Services */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { 

  @Input() showModal:boolean = false;
  
  constructor(private authService:AuthService) { }

  ngOnInit(): void {}  

  handleOk():void{
    this.showModal = false
  }

  handleCancel():void{
    this.showModal = false
  }

  googleAuth():void{
    this.authService.googleAuth(); 
  }  
}
