import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../services/chat.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor(public chatservice: ChatService) { }

  ngOnInit(): void {
  }

  ingresar( proveedor:string){

    this.chatservice.login( proveedor );
  }
}
