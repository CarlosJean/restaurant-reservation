import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserLoggedGuard implements CanActivate {
  
  constructor(private authService:AuthService, private router:Router){}

  canActivate(): Observable<boolean> | boolean | Observable<UrlTree> | UrlTree {
    return this.authService.verifySession().pipe(map((data)=>{ 
      if(data!=null) return true; else this.router.navigate(['/home'])
    }));
  }  
}
