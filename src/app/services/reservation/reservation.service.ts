import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  collectionName = 'reservation';
  constructor(private firestore:AngularFirestore) { }

  add(reservation:any){
    let docId = this.firestore.createId();

    reservation.id = docId;
    reservation.reservationNumber = 1; //<-- verificar
    reservation.userId = 1; //<--verificar

    this.firestore.collection(this.collectionName)
                  .doc(docId)
                  .set(reservation)
                  .then(()=>{
                    console.info('Felicidades! Su reservación ha sido registrada.');
                  })
                  .catch(error=>{
                    console.error(error);
                  });

    
  }

   /* findLastId(){
    return this.firestore.collection(this.collectionName).valueChanges().subscribe(data=>{
      data.sort((sorting)=>{
        console.log(sorting);
      })
    });   

  } */

}
