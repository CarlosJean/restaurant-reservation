import { Component, OnInit } from '@angular/core';

/* Services */
import {AuthService} from '../../../services/auth/auth.service';
/* Services */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { 

  constructor(private authService:AuthService) { }

  ngOnInit(): void {}  

  googleAuth():void{
    this.authService.googleAuth(); 
  }
}
