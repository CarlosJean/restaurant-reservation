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
import { ReservationService } from 'src/app/services/reservation/reservation.service';
/* Services */

/* Form */
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
/* Form */

/* Models */
//import {ReservationModel} from '../../../models/reservationModel/reservation-model';
/* Models */

/* Date */
import setHours from 'date-fns/setHours';
import { AuthService } from 'src/app/services/auth/auth.service';
/* Date */



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  /* Date */
  date = new Date();
  timeDefaultValue = setHours(new Date(),0);
  /* Date */

  /* Icon inicialization */
  faMoneyBillAlt = faCoins
  faMapMarkerAlt = faMapMarkerAlt;
  faReceipt = faReceipt;
  faPhone = faPhone;
  /* Icon inicialization */  

  /* Reservation model */
  reservation = {
    id:null,
    creationDate:null,
    reservationDate:null,
    people:1,
    restaurantId:null,
    //userId:null
  };
  /* Reservation model */  

  userLogged:boolean = false;

  reservationForm = new FormGroup({
    people : new FormControl(this.reservation.people,Validators.required),
    date : new FormControl(this.date,Validators.required)
  });

  reservationModalVisible:boolean = false;
  restaurant:any = {};

  constructor (private restaurantService:RestaurantService,
    private reservationService:ReservationService, 
    private activatedRoute:ActivatedRoute,
    private authService:AuthService) {}

  ngOnInit(): void {
    this.findRestaurant();
    
  }

  reservationModal():void{
    this.verifySession();
    if(this.userLogged){
      this.reservationModalVisible = true;
    }
  }

  handleOk():void{
    
    this.reservationModalVisible = false;

    /* Model binding */
    let people = this.reservationForm.value.people;
    let date = this.reservationForm.value.date.getTime();
    
    this.reservation.reservationDate = date;
    this.reservation.people = people;
    this.activatedRoute.params.subscribe(params=>{
      this.reservation.restaurantId = params.id;
    });    
    /* Model binding */  

    /* Save data */
    this.reservationService.add(this.reservation);
    /* Save data */

  }

  handleCancel():void{
    this.reservationModalVisible = false;
  }

  findRestaurant(){
    this.activatedRoute.params.subscribe(params=>{
      this.restaurantService.findRestaurant(params.id).subscribe(restaurant=>{
        this.restaurant = restaurant;
      });
    });
  }

  private verifySession():void{
    this.authService.verifySession().subscribe(data=>{
      this.userLogged = false;
      if(data != null){
        this.userLogged = data.emailVerified;
      }
    })
  }
  
}
