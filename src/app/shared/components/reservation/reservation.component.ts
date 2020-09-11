import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { AngularFirestore } from '@angular/fire/firestore';

import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

/* Form */
import { FormGroup, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { Validators } from '@angular/forms';
/* Form */

/* Date */
import setHours from 'date-fns/setHours';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DisabledTimeFn } from 'ng-zorro-antd/date-picker';
import { MinDateValidatorDirective } from '../../directives/min-date-validator.directive';
/* Date */

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  
  @Input() isVisible:boolean = false;
  @Output() toggle = new EventEmitter<boolean>();

  /* Date */
  today = new Date();
  timeDefaultValue = setHours(this.today,this.today.getHours()+2);
  /* Date */

  /* Reservation model */
   reservation = {
    id:null,
    creationDate:null,
    reservationDate:null,
    people:1,
    restaurantId:null,
    userId:null
  };
  /* Reservation model */  

  reservationForm = new FormGroup({
    people : new FormControl(this.reservation.people,[Validators.required,Validators.min(1)]),
    date : new FormControl(this.timeDefaultValue,[/* Validators.required, */this.minDateValidator.minDateValidate])
  });

   // convenience getter for easy access to form fields
   get f() { return this.reservationForm.controls; }

  constructor(private reservationService:ReservationService,private activatedRoute:ActivatedRoute, private minDateValidator:MinDateValidatorDirective) {  }

  ngOnInit(): void {}

  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) < 0;
  };

  hideModal(){
    this.toggle.emit(false);
  }

  handleOk():void{
    
    /* Model binding */
    this.reservation.people = this.reservationForm.value.people;
    this.reservation.reservationDate = this.reservationForm.value.date.getTime();
    /* Model binding */

    /* Save data */
    this.activatedRoute.params.subscribe(param=>{
      this.reservation.restaurantId = param.id;
      this.reservationService.add(this.reservation);
    });
    /* Save data */

    this.resetForm();
    
  }

  handleCancel():void{
    this.hideModal();
  }


  private resetForm(){
    /* Ocultar modal y Limpiar datos */
    this.hideModal();
    this.reservation.people = 1;
    this.timeDefaultValue = setHours(this.today,this.today.getHours()+2);

    this.reservationForm = new FormGroup({
      people : new FormControl(this.reservation.people,[Validators.required,Validators.min(1)]),
      date : new FormControl(this.timeDefaultValue,[Validators.required,this.minDateValidator.minDateValidate])
    });
    /* Ocultar modal y Limpiar datos */    
  }

}
