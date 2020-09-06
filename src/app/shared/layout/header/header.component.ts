import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faUser = faUser;
  modalVisible:boolean = false;

  userLogged:boolean;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.verifySession();
  }

  showModal():void{
    this.modalVisible = true;
  }

  handleOk():void{
    this.modalVisible = false
  }

  handleCancel():void{
    this.modalVisible = false
  }

  logOut(){
    this.authService.logout().then(()=>{
      this.userLogged = false;
    });
  }

  private verifySession(){
    this.authService.verifySession().subscribe(data=>{
      if(data != null){
        this.userLogged = data.emailVerified;

        if(this.userLogged){
          this.handleCancel();
        }
      }
    })
  }
  
}
