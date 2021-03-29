import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  isChatShown = false;

  constructor() {}

  ngOnInit(): void {}

  showChat() {
    this.isChatShown = true;
  }

  hideChat() {
    this.isChatShown = false;
  }
}
