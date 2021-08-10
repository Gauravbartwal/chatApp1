import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatroom-titlebar',
  templateUrl: './chatroom-titlebar.component.html',
  styleUrls: ['./chatroom-titlebar.component.scss']
})
export class ChatroomTitlebarComponent implements OnInit {

  @Input() title: string;
  constructor() { }

  ngOnInit(): void {
  }

}
