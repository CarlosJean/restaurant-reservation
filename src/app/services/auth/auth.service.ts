import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  persistenceType='session';
  userLogged:boolean = false;

  constructor(private auth:AngularFireAuth) { }

  verifySession(){
    return this.auth.authState;
  }

  private authPersistence(){
    return this.auth.setPersistence(this.persistenceType);
  }  
  
  googleAuth(){
    this.authPersistence().then(()=>{

      /* Google sign in */
      this.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(()=>{
      }).catch(error=>{
        console.log(error);
      });
      /* Google sign in */      

    }).catch(error=>{
      console.error(error);
    });
  }

  logout(){
    return this.auth.signOut();
  }
}
