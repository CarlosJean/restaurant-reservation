import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
/* SweetAlert */
import Swal from 'sweetalert2'
/* SweetAlert */
import { Observable } from 'rxjs';
import { RestaurantService } from '../restaurant/restaurant.service';
import { AuthService } from '../auth/auth.service';
/* Ng Zorro */
import { NzNotificationService } from 'ng-zorro-antd/notification';
/* Ng Zorro */

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private firestore:AngularFirestore,private restaurantService:RestaurantService,private authService:AuthService, private notification:NzNotificationService) { }

   add(reservation:any){        

    this.authService.verifySession().subscribe(userData=>{     
      this.restaurantService.findRestaurant(reservation.restaurantId).subscribe(restaurant=>{

        /* Se llena el objeto con los datos de la reservación*/
        reservation.userId = userData.uid;
        reservation.id = this.firestore.createId();
        reservation.creationDate = new Date().getTime();
        reservation.status = 'active';
        reservation.restaurant = restaurant;  
        /* Se llena el objeto con los datos de la reservación*/

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

      /* Notification */
      this.notification.blank(
        'Reservación registrada con éxito!',
        `¡Felicidades! Su reservación ha sido realizada. Recuerda llegar a tiempo.`/* ,
        { nzDuration: 10 } */
      );
      /* Notification */

      /* Limpiar objeto de reservaciones */
      for (let prop in reservation) {
        delete reservation[prop];
      }
      /* Limpiar objeto de reservaciones */

    })
    .catch(error=>{
      console.error(error);
      Swal.fire({
        text:`Disculpe, tuvimos un inconveniente al registrar su reservación. Intentelo más tarde.`,
        icon:'error'
      });
    });  
  }

  reservations(userId:string):Observable<any>{
    return this.firestore.collection('reservation', 
    ref => ref.where('userId','==',userId)
    .where('status','==','active')
    .orderBy('reservationDate', 'desc')).valueChanges();
  }
  
  findReservation(reservationId:string):Observable<any>{
    return this.firestore.collection('reservation',ref=>ref.where('id','==',reservationId)).valueChanges();
  }

  cancelReservation(reservationId:string){    
    return this.firestore.collection('reservation').doc(reservationId).update({status:'cancelled'});
  }
}
