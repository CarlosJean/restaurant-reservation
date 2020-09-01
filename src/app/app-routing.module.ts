import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) }, 
  {path:'',redirectTo:'home',pathMatch:'full'},
  { path: 'restaurants', loadChildren: () => import('./modules/restaurants/restaurants.module').then(m => m.RestaurantsModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
