import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
/* SweetAlert */
/* import swal from 'sweetalert'; */
import Swal from 'sweetalert2'
/* import { map } from 'rxjs/operators'; */
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
    this.restaurantService.findRestaurant(reservation.restaurantId).subscribe(restaurant=>{
      reservation.restaurant = restaurant;
      this.createReservation(reservation);  
    });

  }

  private createReservation(reservation){     

    this.firestore
    .collection(this.collectionName)
    .doc(reservation.id)
    .set(reservation)
    .then(()=>{
      Swal.fire({
        html:`Felicidades! Su reservación ha sido registrada.<a href="/reservation/my-reservations">Ver mis reservaciones</a>.`,
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
      Swal.fire({
        text:`Disculpe, tuvimos un inconveniente al registrar su reservación. Intentelo más tarde`,
        icon:'error'
      });
    });  
  }

  reservations():Observable<any>{
    return this.firestore.collection('reservation', ref => ref.orderBy('reservationDate', 'desc')).valueChanges();
  }

}
