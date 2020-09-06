import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css']
})
export class MyReservationsComponent implements OnInit {

  reservations:Array<any> = [];
  constructor(private reservationsService:ReservationService,private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.verifySession().subscribe(userData=>{
      this.reservationsService.reservations(userData.uid).subscribe(data=>{
        this.reservations = data;  
      });
    });
  }

}
