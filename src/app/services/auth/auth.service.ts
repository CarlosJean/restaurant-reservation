import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private persistenceType='session';

  constructor(private auth:AngularFireAuth) { }

  verifySession(){
    return this.auth.authState;
  }

  authPersistence(){
    return this.auth.setPersistence(this.persistenceType);
  }  
  
  googleAuth(){
    return this.auth.signInWithPopup(new auth.GoogleAuthProvider());
  } 

  emailAndPasswordAuth(email:string, password:string){
    return this.auth.signInWithEmailAndPassword(email,password);
  }

  logout(){
    return this.auth.signOut();
  }
}
