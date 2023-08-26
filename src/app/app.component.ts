import { Component, OnDestroy } from '@angular/core';
import { WebSocketService } from './services/web-socket.service';
import { Subscription } from 'rxjs';
import { Message } from './Message.interface';

// Importar paquetes...

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  username: string = '';
  newMessage: string = '';
  messages: Message[] = [];
  private connectionSubscription!: Subscription;

  constructor(private webSocketService: WebSocketService) {
    this.connect();
  }

  private connect(): void {
    this.connectionSubscription = this.webSocketService.connect().subscribe(
      (message) => {
        this.messages.push(message);
      },
      (error) => {
        console.error('Error en la conexión WebSocket:', error);
        // Intentar reconexión aquí (opcional)
      }
    );
  }

  ngOnDestroy(): void {
    if (this.connectionSubscription) {
      this.connectionSubscription.unsubscribe();
      this.webSocketService.close();
    }
  }

  sendMessage() {
    const message = {
      username: this.username,
      content: this.newMessage
    };
    this.webSocketService.send(message);
    this.newMessage = '';
  }
}
