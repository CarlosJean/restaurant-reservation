import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
/* SweetAlert */
/* import swal from 'sweetalert'; */
import Swal from 'sweetalert2'
/* import { map } from 'rxjs/operators'; */
import { Observable } from 'rxjs';
import { RestaurantService } from '../restaurant/restaurant.service';
import { AuthService } from '../auth/auth.service';
/* SweetAlert */

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private firestore:AngularFirestore,private restaurantService:RestaurantService,private authService:AuthService) { }

   add(reservation:any){        
     /* Encontrar el id del documento */
    reservation.id = this.firestore.createId();
    /* Encontrar el id del documento */ 

    reservation.creationDate = new Date().getTime();

    this.authService.verifySession().subscribe(data=>{
      reservation.userId = data.uid;

      this.restaurantService.findRestaurant(reservation.restaurantId).subscribe(restaurant=>{
        reservation.restaurant = restaurant;
        this.createReservation(reservation);  
      });
      
    });  

  }

  private createReservation(reservation){     

    this.firestore
    .collection('reservation')
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

  reservations(userId):Observable<any>{
    return this.firestore.collection('reservation', ref => ref.where('userId','==',userId).orderBy('reservationDate', 'desc')).valueChanges();
  }

}
