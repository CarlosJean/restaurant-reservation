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

  cities:any[];
  res:{count:number,data:any[]};
  p: number = 1;
  restaurants:any[];
  loading = false;
  
  constructor(private restaurantService:RestaurantService, private httpClient:HttpClient) { }

  ngOnInit(): void { 
    this.getAllRestaurants();
  }
  
  getCities(){
    this.restaurantService.cities().subscribe(cities=>{
      this.cities = cities.cities;
      console.log(this.cities);
    });
  }


  
  search(value:string):void {
    //console.log(value);
    this.restaurantService.cities()
                          .pipe(map(data=>data.cities))
                          .subscribe(cities=>{
                            if(value!=''){
                              this.cities = cities.filter(cities=>{
                                return cities.toLowerCase().indexOf(value.toLowerCase()) > -1
                              });

                            }
                          });
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
        console.log(this.restaurants);
      });
  }

}
