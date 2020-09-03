import { Component, OnInit } from '@angular/core';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  today = new Date();
  reservationForm = new FormGroup({
    people : new FormControl(),
    date : new FormControl(),
    time : new FormControl()
  });
  constructor(private firestore:AngularFirestore) { 
    this.firebaseTest();
  }

  ngOnInit(): void {
  }

  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) < 0;
  };

  firebaseTest(){
    this.firestore.collection('reservation').valueChanges().subscribe(reservations=>{
      console.log(reservations);
    })
  }
}
