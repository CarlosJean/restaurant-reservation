import { Component, OnInit } from '@angular/core';
import {RestaurantService} from '../../services/restaurant/restaurant.service';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

/*   cities:any[];
  res:{count:number,data:any[]}; */
  p: number = 1;
  restaurants:any[];
  loading = false;
  
  constructor(private restaurantService:RestaurantService) { }

  ngOnInit(): void { 
    this.getAllRestaurants();
  }
  
  inputSearch(value:string){
    
    if(value!=''){
      this.loading = true;
      this.restaurantService
      .restaurants(value)
      .subscribe(restaurants=>{
        this.restaurants = restaurants.restaurants;
        this.loading = false;
      });
    }
  }

  getAllRestaurants(){
    this.restaurantService
      .restaurants()
      .subscribe(restaurants=>{
        this.loading = true;
        this.restaurants = restaurants.restaurants;
        this.loading = false;
      });
  }

}
