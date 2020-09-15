import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './components/login/login.component'
import {ReservationComponent} from './components/reservation/reservation.component'
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

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
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
/* Ng Zorro */

/* Firebase */
import { AngularFireModule } from '@angular/fire';
/* Firebase */

import { environment } from 'src/environments/environment';

/* Forms module */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MinDateValidatorDirective } from './directives/min-date-validator/min-date-validator.directive';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { PasswordConfirmationDirective } from './directives/password-confirmation/password-confirmation.directive';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
/* Forms module */

@NgModule({
  declarations: [LoginComponent,HeaderComponent,FooterComponent,ReservationComponent, UserRegistrationComponent, PasswordConfirmationDirective, ForgotPasswordComponent],
  imports: [
    CommonModule,
    RouterModule,

    /* Ng Zorro */
    NzModalModule,
    NzInputModule,
    NzButtonModule,
    NzGridModule,
    NzFormModule,
    NzInputNumberModule,
    NzDatePickerModule,
    NzAlertModule,
    NzIconModule,
    NzDropDownModule,
    NzCheckboxModule,
    NzNotificationModule,
    NzMessageModule,
    NzPopconfirmModule,
    /* Ng Zorro */    

    /* Firebase */
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
    /* Firebase */    
    
    /* Forms module */
    FormsModule,
    ReactiveFormsModule
    /* Forms module */    
  ],
  exports:[LoginComponent,HeaderComponent,FooterComponent,ReservationComponent,NzFormModule,UserRegistrationComponent,NzCheckboxModule],
  providers:[MinDateValidatorDirective]

})
export class SharedModule { }