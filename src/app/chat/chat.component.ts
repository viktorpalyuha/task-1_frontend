import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  isChatShown = false;
  writtenMessage: string = '';
  messages: string[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.receiveMessage().subscribe((message: string) => {
      this.messages.push(message);
    });
  }

  showChat() {
    this.isChatShown = true;
  }

  hideChat() {
    this.isChatShown = false;
  }

  sendMessage() {
    this.chatService.sendMessage(this.writtenMessage);
    this.writtenMessage = '';
  }
}
