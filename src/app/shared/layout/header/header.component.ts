import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faUser = faUser;
  modalVisible:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  showModal():void{
    this.modalVisible = true;
    console.log(this.modalVisible);
  }

  handleOk():void{
    this.modalVisible = false
  }

  handleCancel():void{
    this.modalVisible = false
  }

  
}
