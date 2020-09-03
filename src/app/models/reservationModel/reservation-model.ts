import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
  })
export class ReservationModel {

    creationDate:Number= new Date().getTime();
    id:string= 'HX6MNGzrjHWtXiZrSTgf';
    people:Number=1;
    reservationDate:Number=new Date().getTime();
    reservationTime:Number=new Date().getTime();
    restaurantId:Number= 1;
    reservationNumber:Number=1;
}