import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private socket: Socket) {
  }

  sendMessage(message: string): void {
    this.socket.emit('sendMessage', message);
  }

  receiveMessage() {
    return this.socket.fromEvent('receivedMessage');
  }
}
