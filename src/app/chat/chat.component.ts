import { Message } from './../shared/models/chat/message.model';
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
  messages: Message[] = [];
  userFullName: string;

  constructor(private chatService: ChatService) {
    this.chatService.establishConnection();
  }

  ngOnInit(): void {
    this.chatService.requestUserFullName();
    this.chatService.getUserFullName().subscribe((fullName: string) => {
      this.userFullName = fullName;
    });
    this.chatService.requestAllMessages();
    this.chatService.getAllMessages().subscribe((message: Message[]) => {
      this.messages.push(...message);
    });
    this.chatService.receiveMessage().subscribe((message: Message) => {
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
    if (this.writtenMessage.trim() && this.writtenMessage.trim().length <= 29) {
      this.chatService.sendMessage(this.writtenMessage);
    }
    this.writtenMessage = '';
  }
}
