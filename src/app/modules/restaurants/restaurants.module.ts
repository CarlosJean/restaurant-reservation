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
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NzButtonModule } from 'ng-zorro-antd/button';
/* import { ReservationComponent } from '../../shared/components/reservation/reservation.component'; */
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

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
/* import { LoginComponent } from 'src/app/shared/components/login/login.component'; */
/* Services */


@NgModule({
  declarations: [RestaurantsComponent, DetailsComponent/* , ReservationComponent */],
  imports: [
    CommonModule,
    RestaurantsRoutingModule,
    NzGridModule,
    NzRateModule,
    FormsModule,
    NzIconModule,
    FontAwesomeModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzInputNumberModule,
    NzDatePickerModule,
    NzTimePickerModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsApiKey
    }),
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase) 
  ],
  providers:[
    RestaurantService,
    ReservationService
  ]
})
export class RestaurantsModule { }
