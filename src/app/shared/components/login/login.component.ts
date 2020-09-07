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

  @Input() isVisible:boolean;
  @Output() toggle = new EventEmitter<boolean>();
  
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.isVisible = false;
  }  

  handleOk(): void {    
    this.toggle.emit(false);
  }

  handleCancel(): void {    
    this.toggle.emit(false);
  }

  googleAuth():void{
    this.authService.authPersistence().then(()=>{
      this.authService.googleAuth().then((userData)=>{
        if(userData.user.uid != null){
          this.handleOk();
        }
      }).catch(error=>{
        console.error(error)
      })
    }).catch(error=>{
      console.error(error);
    });
  }  
}
