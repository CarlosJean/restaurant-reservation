import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserLoggedGuard implements CanActivate {

  userLogged:boolean = false;
  constructor(private authService:AuthService, private router:Router){
    this.authService.authState().subscribe(userData=>{
      if(userData!=null) this.userLogged = true;
    })
  }

  canActivate(): boolean {
      if(!this.userLogged){
        this.router.navigate(['/']);
      }
      return this.userLogged;
  }
  
}
