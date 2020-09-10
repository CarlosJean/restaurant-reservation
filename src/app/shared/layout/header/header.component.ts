import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  /* faUser = faUser; */
  isVisible:boolean = false;
  userLogged:boolean;

  /* Modals */
  userRegistrationVisible:boolean = false;
  changePasswordVisible:boolean = false;
  /* Modals */  


  displayName:string;  

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.verifySession();
  }

  logOut(){
    this.authService.logout().then(()=>{
      this.userLogged = false;
      this.isVisible = false;
      this.router.navigate(['/home']);
    }).catch(error=>{
      console.error(error);
    });
  }

  private verifySession(){
    this.authService.verifySession().subscribe(data=>{
      this.userLogged = false;
      if(data != null){
        this.userLogged = data.emailVerified; 
        this.displayName = data.displayName;
      }
    })
  }

 toggleLoginModal(show:boolean = true){
    this.isVisible = show;
  }
  
  logoutAlert(){
    Swal.fire({
      text: "¿Estás segur@ que deseas salir?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.logOut();
      }
    })
  }
  
  userRegistrationToggle(show:boolean=true){
    this.userRegistrationVisible = show;
  } 

  changePasswordToggle(show:boolean=true){
    this.changePasswordVisible = show;
  }
}
