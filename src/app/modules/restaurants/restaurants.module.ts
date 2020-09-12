import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { RestaurantsComponent } from './restaurants.component';
import { DetailsComponent } from './details/details.component';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzRateModule } from 'ng-zorro-antd/rate';
/* Forms */
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
/* Forms */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
/* Ng Zoro */
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
/* Ng Zoro */

/* Google maps */
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
/* Google maps */

/* Firebase */
import { AngularFireModule } from '@angular/fire';
/* Firebase */

/* Services */
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { SharedModule } from 'src/app/shared/shared.module';
/* import { LoginComponent } from 'src/app/shared/components/login/login.component'; */
/* import { LoginComponent } from 'src/app/shared/components/login/login.component'; */
/* Services */


@NgModule({
  declarations: [RestaurantsComponent, DetailsComponent/* ,LoginComponent *//* , ReservationComponent */],
  imports: [
    CommonModule,
    RestaurantsRoutingModule,
    FormsModule,
    FontAwesomeModule,
    /* Ng Zorro */
    NzGridModule,
    NzRateModule,
    NzIconModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzDatePickerModule,
    NzTimePickerModule,
    /* Ng Zorro */
    ReactiveFormsModule,
    /* Angular maps */
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsApiKey
    }),
    /* Angular maps */
    /* AngularFireModule, */
    AngularFireModule.initializeApp(environment.firebase),
    /* SharedModule */
    SharedModule 
  ],
  providers:[
    RestaurantService,
    ReservationService
  ]
})
export class RestaurantsModule { }
