import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './components/login/login.component'
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
/* Ng Zorro */
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { RouterModule } from '@angular/router';
/* Ng Zorro */

@NgModule({
  declarations: [LoginComponent,HeaderComponent,FooterComponent],
  imports: [
    CommonModule,
    /* BrowserModule, */
    /* AppRoutingModule, */
    NzModalModule,
    NzInputModule,
    NzButtonModule,
    NzGridModule,
    NzFormModule,
    RouterModule
  ],
  exports:[LoginComponent,HeaderComponent,FooterComponent,NzGridModule]

})
export class SharedModule { }
