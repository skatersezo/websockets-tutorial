import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';

/**
 * We’ll need to import * from the rxjs library at the top of our new service. This will allow us to create
 * the subject that will both observe and be observable. This essentially means our subject will watch our
 *  websocket for any incoming messages and will broadcast these messages to any components that happen to
 *  be subscribing to this service.
 */

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  // https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent
  private subject: Rx.Subject<MessageEvent>;

  constructor() { }

  public connect(url: string): Rx.Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log('Conectado correctamente a ' + url);
    }
    return this.subject;
  }

  private create(url: string): Rx.Subject<MessageEvent> {
    const ws = new WebSocket(url);

    const observable = Rx.Observable.create((obs: Rx.Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });

    const observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    return Rx.Subject.create(observer, observable);
  }
}
