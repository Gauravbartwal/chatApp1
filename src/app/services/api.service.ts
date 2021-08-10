import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Message } from '../classes/message';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  @Output() sendMsg = new EventEmitter<any>();
  private msgsrc = new BehaviorSubject('default');
  currmsg = this.msgsrc.asObservable();
  websocket: WebSocket;
  public chatMessages: Message[] = [];
  private REST_API_SERVER = "http://localhost:8000/";
  constructor(private httpClient: HttpClient, private _auth: AuthService) { }

  getTypeRequest(url){
    return this.httpClient.get(this.REST_API_SERVER+url).pipe(map(res=>{ return res; }));
  }

  postTypeRequest(url, payload,){
    return this.httpClient.post(this.REST_API_SERVER+url, payload).pipe(map(res=>{return res;}));
  }

  putTypeReuest(url, payload){
    return this.httpClient.put(this.REST_API_SERVER+url, payload).pipe(map(res=>{return res;}));
  }

  public openWebSocket(sender: string ){
    this.websocket = new WebSocket(`ws://localhost:8000/ws/${sender}`);
    this.websocket.onopen = (event) => {
      console.log('Open', event);
    };

    this.websocket.onmessage = (event) =>{
      const chatMessageDto = JSON.parse(event.data);
      this.msgsrc.next(chatMessageDto);
      this.chatMessages.push(chatMessageDto);
    };

    this.websocket.onclose = (event) =>{
      console.log('Close', event);
    };
  }

  public sendMessage(chatMessageDto: Message){
    console.log(JSON.stringify(chatMessageDto))
    this.websocket.send(JSON.stringify(chatMessageDto));
  }

  public closeWebSocket() {
    this.websocket.close();
  }
}
