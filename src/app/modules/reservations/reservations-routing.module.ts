import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservationsComponent } from './reservations.component';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';

const routes: Routes = [
  { path: '', component: ReservationsComponent },
  {path:'my-reservations',component:MyReservationsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationsRoutingModule { }
