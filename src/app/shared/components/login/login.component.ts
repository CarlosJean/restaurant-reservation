import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AngularFireAuth) { }

  ngOnInit(): void {
  }

  googleLogin(){
    this.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(data=>{
      console.log(data);
    });
  }
}
