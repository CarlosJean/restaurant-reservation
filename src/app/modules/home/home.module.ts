import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { NzSpinModule } from 'ng-zorro-antd/spin';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NzGridModule,
    NzInputModule,
    NzIconModule,
    NzSelectModule,
    NzCardModule,
    NzRateModule,
    FormsModule,
    NzButtonModule,
    NgxPaginationModule,
    NzSpinModule
  ]
})
export class HomeModule { }
