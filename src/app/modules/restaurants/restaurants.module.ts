import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { RestaurantsComponent } from './restaurants.component';
import { DetailsComponent } from './details/details.component';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [RestaurantsComponent, DetailsComponent],
  imports: [
    CommonModule,
    RestaurantsRoutingModule,
    NzGridModule,
    NzRateModule,
    FormsModule,
    NzIconModule,
    FontAwesomeModule,
    NzButtonModule
  ]
})
export class RestaurantsModule { }
