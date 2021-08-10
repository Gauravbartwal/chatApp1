import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {

  public newMessageText: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  public submit(message: string): void {
    // todo to save text to backend

    console.log('New Message:', message);

    this.newMessageText = '';
  }

}
