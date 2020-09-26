import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) }, 
  {path:'',redirectTo:'home',pathMatch:'full'},
  { path: 'restaurants', loadChildren: () => import('./modules/restaurants/restaurants.module').then(m => m.RestaurantsModule) },
  { path: 'reservation', loadChildren: () => import('./modules/reservations/reservations.module').then(m => m.ReservationsModule) },
  { path: '404', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/404'},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
