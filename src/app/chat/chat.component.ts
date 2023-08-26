import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  newMessage: any = {};

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.connect();

    this.chatService.getMessages().subscribe((message: any) => {
      this.messages.push(message);
    });
  }

  sendMessage() {
    if (this.newMessage.content && this.newMessage.content.trim() !== '') {
      this.chatService.sendMessage(this.newMessage);
      this.newMessage.content = '';
    }
  }
}
