import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$!: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket('wss://chat-service-31sz.onrender.com/ws');
  }

  connect() {
    return this.socket$.asObservable();
  }

  send(message: any) {
    this.socket$.next(message);
  }

  close() {
    this.socket$.complete();
  }
}
