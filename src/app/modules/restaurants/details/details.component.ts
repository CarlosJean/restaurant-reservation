import { Component, OnInit } from '@angular/core';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
//import { faFont } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
/*import { faCoffee } from '@fortawesome/free-solid-svg-icons'; */

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  faMoneyBillAlt = faCoins
  faMapMarkerAlt = faMapMarkerAlt;
  faReceipt = faReceipt;
  faPhone = faPhone;
  //faCoffee = faCoffee

  reservationModalVisible:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  reservationModal():void{
    this.reservationModalVisible = true;
    console.log(this.reservationModalVisible);
  }

  handleOk():void{
    this.reservationModalVisible = false;
  }

  handleCancel():void{
    this.reservationModalVisible = false;
  }
}
