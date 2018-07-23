import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { WebsocketService } from './websocket.service';

const CHAT_URL = 'ws://echo.websocket.org/';

export interface Message {
  author: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public messages: Subject<Message>;

  constructor(private wsService: WebsocketService) {
    this.messages = <Subject<Message>>wsService
      .connect(CHAT_URL)
      .pipe(map((response: MessageEvent): Message => {
        const data = JSON.parse(response.data);
        return {
          author: data.author,
          message: data.message
        };
      }));
   }
}
