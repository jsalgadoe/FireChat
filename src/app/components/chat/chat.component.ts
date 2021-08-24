import { Component, OnInit } from '@angular/core';

import { ChatService} from "../../services/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit {
  mensaje:string = "";
  element:any;
  constructor(public chatservice: ChatService) {
    this.chatservice.cargarMensaje().subscribe(

      ()=>{
        setTimeout(()=>{
          this.element.scrollTop =  this.element.scrollHeight;
        },20)
      }
    );
  }

  ngOnInit(): void {
    this.element =  document.getElementById('app-mensajes');
  }



  sendMessage(){
   console.log(this.mensaje);
   if(this.mensaje.length === 0 ) {
     return;
   }

   this.chatservice.addmensaje( this.mensaje )
     .then(() => this.mensaje="")
     .catch((err:any) => console.log('error al enviar', err))
  }

}
