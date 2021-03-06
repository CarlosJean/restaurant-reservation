import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:AngularFireAuth) { }

  verifySession= ()=>{ return this.auth.authState;}

  authPersistence(keepSessionActive:boolean = true){
    return (keepSessionActive) ? this.auth.setPersistence('session') : this.auth.setPersistence('none')
  }  
  
  googleAuth(){
    return this.auth.signInWithPopup(new auth.GoogleAuthProvider());
  } 

  facebookAuth(){
    return this.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }

  microsoftAuth(){
    let microsoftProvider = new auth.OAuthProvider('microsoft.com');
    return this.auth.signInWithPopup(microsoftProvider);
  }

  emailAndPasswordAuth(email:string, password:string){
    return this.auth.signInWithEmailAndPassword(email,password);
  }

  logout = ()=>{return this.auth.signOut();}

  forgotPassword(email:string){
    return this.auth.sendPasswordResetEmail(email);
  }

  errorMessages(errorCode:string){
    
    let errorMessage:string = '';
    switch(errorCode){
      case 'auth/wrong-password':{
        errorMessage = 'Correo electrónico o contraseña incorrecta.'
        break;
      }
      case 'auth/email-not-verified':{
        errorMessage = 'Aún no ha activado su cuenta. Por favor, revise su correo para activar su cuenta.'
        break;
      }
      case 'auth/user-not-found':{
        errorMessage = 'Este usuario aún no se ha registrado.'
        break;
      }
      case 'auth/invalid-email':{
        errorMessage = 'Ingrese un correo electrónico válido.'
        break;
      }
      case 'auth/account-exists-with-different-credential':
        errorMessage = 'Ya existe una cuenta con la misma dirección de correo electrónico pero diferentes credenciales de inicio de sesión.'
    }

    return errorMessage;
  }

  createUserWithEmailAndPassword(email:string,password:string){
    return this.auth.createUserWithEmailAndPassword(email,password);
  }

  authProvider(){
    return this.auth.user;
  }

  authState(){
    return this.auth.authState;
  }
}

