import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

/* Services */
import {AuthService} from '../../../services/auth/auth.service';
/* Services */

/* Modal */
import { NzModalService } from 'ng-zorro-antd/modal';
import { HeaderComponent } from '../../layout/header/header.component';
/* Modal */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { 

  @Input() modalVisible:boolean;
  @Output() modalClosed = new EventEmitter<boolean>();
  
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.modalVisible = false;
  }  

  handleOk(): void {    
    this.modalVisible = false;
    this.modalClosed.emit(this.modalVisible);
  }

  handleCancel(): void {    
    this.modalVisible = false;
    this.modalClosed.emit(this.modalVisible);
  }

  googleAuth():void{
    this.authService.googleAuth(); 
  }  

  ngOnDestroy() {
    console.log('Login destroyed!');
 }
}
