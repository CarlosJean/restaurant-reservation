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
  restaurants:any[] = [];
  loading = false;
  
  /* selectedValue = null;
  listOfOption: Array<string> = [];
  nzFilterOption = () => true; */
  constructor(private restaurantService:RestaurantService) { }

  ngOnInit(): void { 
    this.getAllRestaurants();
  }
  
  inputSearch(value:string){

    //if(value!=''){
      this.loading = true;
      this.restaurantService
      .restaurants(value)
      .subscribe(restaurants=>{
        this.restaurants = restaurants.restaurants;
        this.loading = false;
        console.log(this.restaurants.length);
      });
    //}
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

  /* search(value: string) {
    //this.restaurantService.search(value);
    if(value != ''/*  || value!= undefined || value!=null ){
      this.restaurantService.search(value).subscribe(data => {
        const listOfOption: Array<string> = [];
        data.restaurants.forEach(item => {
          listOfOption.push(item.name);
        });
        this.listOfOption = listOfOption;
      })
      
    }
  } */

}
