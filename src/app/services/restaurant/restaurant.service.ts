import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  url:string = 'http://opentable.herokuapp.com';
  constructor(private http:HttpClient) { }

  cities():Observable<any>{
    let citiesUrl = this.url+"/api/cities";
    return this.http.get(citiesUrl);
  }

  restaurants(name?:string):Observable<any>{
    let restaurantsUrl = this.url+'/api/restaurants?page=1&country=US';

    if(name!=undefined && name!=''){
       restaurantsUrl = this.url+'/api/restaurants?name='+name;
    }

    return this.http.get(restaurantsUrl);
  }

  findRestaurant(id:number):Observable<any>{
    let restaurantUrl= this.url+'/api/restaurants/'+id;
    return this.http.get(restaurantUrl);
  }  
}
