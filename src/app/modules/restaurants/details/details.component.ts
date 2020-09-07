import { Component, OnInit } from '@angular/core';

/* Icons */
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
/* Icons */

/* Services */
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';
/* import { ReservationService } from 'src/app/services/reservation/reservation.service'; */
/* Services */



/* Models */
//import {ReservationModel} from '../../../models/reservationModel/reservation-model';
/* Models */

/* Date */
import { AuthService } from 'src/app/services/auth/auth.service';
/* Date */

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
 
  /* Icon inicialization */
  faMoneyBillAlt = faCoins
  faMapMarkerAlt = faMapMarkerAlt;
  faReceipt = faReceipt;
  faPhone = faPhone;
  /* Icon inicialization */  
 
  /* userLogged:boolean = false; */  

  reservationModalVisible:boolean = false;
  loginModalVisible:boolean = false;

  restaurant:any = {};

  constructor (private authService:AuthService,private restaurantService:RestaurantService,private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.findRestaurant();    
  }

  /* reservationModal():void{
    this.verifySession();
    this.loginModalVisible = true;
    if(this.userLogged){
      this.reservationModalVisible = true;
      this.modalVisible = false;
    }
  }  */
  

  private verifySession():void{
    this.authService.verifySession().subscribe(data=>{

      if(data != null){
        this.reservationModalVisible = data.emailVerified;
        return true;
      }
      
      this.loginModalVisible = true;
    })
  }
  
  /* onModalClosed(show){
    this.modalVisible = false;
  } */

  hideReservationModal(){
    this.reservationModalVisible = false;
  }

  private findRestaurant():void{
    this.activatedRoute.params.subscribe(params=>{
      this.restaurantService.findRestaurant(params.id).subscribe(restaurant=>{
        this.restaurant = restaurant;
      });
    });
  }

  toggleReservationModal(show:boolean = true){
   
    if(show){
      this.verifySession();
      return true;
    }

    this.reservationModalVisible = show;    
    
  }

  toggleLoginModal(show:boolean = true){
    this.loginModalVisible = show;
  }
}
