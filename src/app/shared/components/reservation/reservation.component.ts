import { Component, OnInit } from '@angular/core';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  today = new Date();
  constructor() { }

  ngOnInit(): void {
  }

  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) < 0;
  };

}
