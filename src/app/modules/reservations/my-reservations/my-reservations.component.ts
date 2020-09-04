import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css']
})
export class MyReservationsComponent implements OnInit {

  reservations:Array<any> = [];
  constructor(private reservationsService:ReservationService,private restaurantService:RestaurantService) { }

  ngOnInit(): void {
    this.reservationsService.reservations().subscribe(data=>{
      this.reservations = data;  
    });

    /* this.reservations.forEach(item=>{
      this.restaurantService.findRestaurant(item.restaurantId).pipe(map());
    }); */
  }

}
