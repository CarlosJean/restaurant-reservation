import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './components/login/login.component'
import {ReservationComponent} from './components/reservation/reservation.component'
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
/* import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser'; */

/* Ng Zorro */
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { RouterModule } from '@angular/router';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzAlertModule } from 'ng-zorro-antd/alert';
/* Ng Zorro */

/* Firebase */
import { AngularFireModule } from '@angular/fire';
/* Firebase */

import { environment } from 'src/environments/environment';

/* Forms module */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MinDateValidatorDirective } from './directives/min-date-validator.directive';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { PasswordConfirmationDirective } from './directives/password-confirmation/password-confirmation.directive';
/* Forms module */

@NgModule({
  declarations: [LoginComponent,HeaderComponent,FooterComponent,ReservationComponent, UserRegistrationComponent, PasswordConfirmationDirective],
  imports: [
    CommonModule,
    /* BrowserModule, */
    /* AppRoutingModule, */
    NzModalModule,
    NzInputModule,
    NzButtonModule,
    NzGridModule,
    NzFormModule,
    NzInputNumberModule,
    NzDatePickerModule,
    NzAlertModule,
    RouterModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),

    /* Forms module */
    FormsModule,
    ReactiveFormsModule
    /* Forms module */    
  ],
  exports:[LoginComponent,HeaderComponent,FooterComponent,ReservationComponent,NzFormModule,UserRegistrationComponent/*,FormsModule,ReactiveFormsModule ,NzGridModule,,NzInputModule,NzInputNumberModule,NzDatePickerModule */],
  providers:[MinDateValidatorDirective]

})
export class SharedModule { }
