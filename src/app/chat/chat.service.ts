import { Message } from './../shared/models/chat/message.model';
import { AuthService } from './../auth/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  socket: SocketIOClient.Socket;

  constructor(private authService: AuthService) {}

  establishConnection() {
    this.socket = io('http://localhost:3000', {
      transports: ['websocket'],
      query: {
        authorization: this.authService.getToken(),
      },
    });
  }

  sendMessage(message: string): void {
    this.socket.emit('sendMessage', message);
  }

  receiveMessage() {
    return new Observable((observer) => {
      this.socket.on('receivedMessage', (message: Message) => {
        observer.next(message);
      });
    });
  }

  requestAllMessages() {
    this.socket.emit('requestAllMessages');
  }

  getAllMessages() {
    return new Observable((observer) => {
      this.socket.on('sendAllMessages', (message: Message[]) => {
        observer.next(message);
      });
    });
  }

  requestUserFullName() {
    this.socket.emit('requestUserFullName');
  }

  getUserFullName() {
    return new Observable((observer) => {
      this.socket.on('sendUserFullName', (full_name: string) => {
        observer.next(full_name);
      });
    });
  }
}
