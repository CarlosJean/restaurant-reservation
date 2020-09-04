import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
/* SweetAlert */
import swal from 'sweetalert';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RestaurantService } from '../restaurant/restaurant.service';
/* SweetAlert */

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  collectionName = 'reservation';
  constructor(private firestore:AngularFirestore,private restaurantService:RestaurantService) { }

  
   add(reservation:any){        
     /* Encontrar el id del documento */
    let docId = this.firestore.createId();
    reservation.id = docId;
    /* Encontrar el id del documento */ 

    reservation.creationDate = new Date().getTime();
    reservation.userId = 1; //<--verificar
    let restaurant = this.restaurantService.findRestaurant(reservation.restaurantId).subscribe(restaurant=>{
      console.log(restaurant);
    });
    if(restaurant.closed){
      this.createReservation(reservation);  
    }

  }

  private createReservation(reservation){     

    this.firestore
    .collection(this.collectionName)
    .doc(reservation.id)
    .set(reservation)
    .then(()=>{
      swal({
        text:`Felicidades! Su reservación ha sido registrada.`,
        icon:'success'
      });

      /* Limpiar objeto de reservaciones */
      for (let prop in reservation) {
        delete reservation[prop];
      }
      /* Limpiar objeto de reservaciones */

    })
    .catch(error=>{
      console.error(error);
      swal({
        text:`Disculpe, tuvimos un inconveniente al registrar su reservación. Intentelo más tarde`,
        icon:'error'
      });
    });  
  }

  reservations():Observable<any>{
    return this.firestore.collection('reservation', ref => ref.orderBy('reservationDate', 'desc')).valueChanges();
  }

}
