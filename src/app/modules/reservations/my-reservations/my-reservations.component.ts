import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css']
})
export class MyReservationsComponent implements OnInit {

  reservations:Array<any> = [];
  confirmModal?: NzModalRef;

  constructor(private reservationsService:ReservationService,private authService:AuthService,private modal: NzModalService) { }

  ngOnInit(): void {
    this.authService.verifySession().subscribe(userData=>{
      if(userData != null){
        this.reservationsService.reservations(userData.uid).subscribe(data=>{
          this.reservations = data;  
        });
      }
    });
  }

  cancelReservation(reservationId:string){
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Estás a punto de cancelar esta reservación.',
      nzContent: '¿Estás segur@ que deseas cancelar esta reservación?',
      nzOkText:'Sí',
      nzCancelText: 'No',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.reservationsService.cancelReservation(reservationId).then(()=>{
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);            
          }).catch(error=>{
            console.error(error);
          });
        }).catch(() => console.log('Oops errors!'))
    });
    
  }
}
