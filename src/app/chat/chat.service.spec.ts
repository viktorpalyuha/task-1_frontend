import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ChatService } from './chat.service';
import { Message } from './../shared/models/chat/message.model';
import { MessageMock } from './../core/mocks/message.mock';
import { Observable } from 'rxjs';

describe('ChatService', () => {
  let service: ChatService;
  let mockedMessage: Message[] = MessageMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService,
      ],
    });
    service = TestBed.inject(ChatService);
    service.establishConnection();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set socket variable', () => {
    expect(service.socket).toBeTruthy();
  });

  it('should emit sendMessage event and provided message', () => {
    spyOn(service.socket, 'emit');
    service.sendMessage('message');

    expect(service.socket.emit).toHaveBeenCalledWith('sendMessage', 'message');
  });

  it('should return Observable on receiveMessage call', () => {
    const returnedValue = service.receiveMessage();

    expect(returnedValue).toBeInstanceOf(Observable);
  });

  it('should emit requestAllMessages event', () => {
    spyOn(service.socket, 'emit');
    service.requestAllMessages();

    expect(service.socket.emit).toHaveBeenCalledWith('requestAllMessages');
  });

  it('should return Observable on getAllMessages call', () => {
    const returnedValue = service.getAllMessages();

    expect(returnedValue).toBeInstanceOf(Observable);
  });

  it('should emit requestUserFullName event', () => {
    spyOn(service.socket, 'emit');
    service.requestUserFullName();

    expect(service.socket.emit).toHaveBeenCalledWith('requestUserFullName');
  });

  it('should return Observable on getUserFullName call', () => {
    const returnedValue = service.getUserFullName();

    expect(returnedValue).toBeInstanceOf(Observable);
  });
});
