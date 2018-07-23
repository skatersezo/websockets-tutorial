import { Component } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ WebsocketService, ChatService ]
})
export class AppComponent {

  constructor(private chatService: ChatService) {
    chatService.messages.subscribe(msg => {
      console.log('Respuesta del WebSocket: ' + msg);
    });
  }

  private message = {
    author: 'ivanEspinosa',
    message: 'Mensaje de prueba'
  };

  sendMsg() {
    console.log('Nuevo mensaje de cliente a WebSocket: ', this.message);
    this.chatService.messages.next(this.message);
    this.message.message = '';
  }

}
