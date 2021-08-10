import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Message } from 'src/app/classes/message';
import { User } from 'src/app/classes/user';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {
  public chatMessage: Message;
  public newMessageText: string;
  private date: Date;
  private sender: User;
  private name: any;
  @Output() sendMessage = new EventEmitter<any>();
  constructor(public _api: ApiService, public _auth: AuthService) {
    this.name = this._auth.getFirst();
  }

  ngOnInit(): void {
    // this._api.openWebSocket(this.name);
  }
  ngOnDestroy(): void {
    // this._api.closeWebSocket();
  }
  public submit(message: string): void {
    this.newMessageText = message;
    this.date = new Date();
    this.sender = new User({firstName: this._auth.getFirst(),  lastName: this._auth.getLast(), photoUrl:this._auth.getUrl()});
    this.chatMessage = new Message({message: this.newMessageText, createdAt : this.date, sender: this.sender});
    this._api.sendMessage(this.chatMessage);
  }
}
