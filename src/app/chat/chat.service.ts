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
      this.socket.on('receivedMessage', (message: string) => {
        observer.next(message);
      });
    });
  }
}
