import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket('ws://localhost:3000/ws');
  }

  connect() {
    this.socket$.next({}); // Conexión inicial, no es necesario enviar datos
  }

  getMessages() {
    return this.socket$.asObservable();
  }

  sendMessage(message: any) {
    this.socket$.next(message);
  }
}
