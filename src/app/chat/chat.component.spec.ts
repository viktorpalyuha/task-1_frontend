import { Message } from './../shared/models/chat/message.model';
import { Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageMock } from './../core/mocks/message.mock';
import { ChatComponent } from './chat.component';
import { ChatService } from './chat.service';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let chatService: ChatService;
  let messagesMock: Message[] = MessageMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ChatComponent],
      providers: [
        ChatService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    chatService = fixture.debugElement.injector.get(ChatService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('constructor', () => {
    it('should call establishConnection', () => {
      spyOn(chatService, 'establishConnection');
      TestBed.createComponent(ChatComponent);
      expect(chatService.establishConnection).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('should call requestUserName', () => {
      spyOn(chatService, 'requestUserFullName');

      component.ngOnInit();

      expect(chatService.requestUserFullName).toHaveBeenCalled();
    });

    it('should set userFullName to string', () => {
      spyOn(chatService, 'getUserFullName').and.returnValue(
        new Observable((observer) => {
          observer.next('123');
        })
      );

      component.ngOnInit();

      expect(component.userFullName).toEqual('123');
    });

    it('should call requestAllMessages', () => {
      spyOn(chatService, 'requestAllMessages');

      component.ngOnInit();

      expect(chatService.requestAllMessages).toHaveBeenCalled();
    });

    it('should set messages variable to array of messages', () => {
      spyOn(chatService, 'getAllMessages').and.returnValue(
        new Observable((observer) => {
          observer.next(messagesMock);
        })
      );

      component.ngOnInit();

      expect(component.messages).toEqual(messagesMock);
    });

    it('should push message to messages variable', () => {
      spyOn(chatService, 'receiveMessage').and.returnValue(
        new Observable((observer) => {
          observer.next(messagesMock[0]);
        })
      );

      component.ngOnInit();

      expect(component.messages).toEqual([messagesMock[0]]);
    });
  });

  it('should set isChatShown variable to true', () => {
    component.showChat();

    expect(component.isChatShown).toBeTruthy();
  });

  it('should set isChatShown variable to false', () => {
    component.hideChat();

    expect(component.isChatShown).toBeFalsy();
  });

  it('should call sendMessage and reset writtenMessage variable', () => {
    spyOn(chatService, 'sendMessage');
    component.writtenMessage = 'some text'
    
    component.sendMessage();

    expect(chatService.sendMessage).toHaveBeenCalled();
    expect(component.writtenMessage).toBeFalsy();
  });
});
