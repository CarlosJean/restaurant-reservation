import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationsRoutingModule } from './reservations-routing.module';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';

/* Firebase */
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
/* Firebase */

/* ng Zorro */
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
/* ng Zorro */

@NgModule({
  declarations: [MyReservationsComponent],
  imports: [
    CommonModule,
    ReservationsRoutingModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
    NzGridModule,
    NzListModule,
    NzIconModule,
    NzModalModule,
    NzMessageModule 
  ],
  providers:[
    ReservationService
  ]
})
export class ReservationsModule { }
