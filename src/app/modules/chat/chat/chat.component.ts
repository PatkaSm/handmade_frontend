import { Component, Input, OnInit } from '@angular/core';
import { IMessage } from 'src/app/core/interfaces/chat.interface';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @Input() messages: IMessage[];

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
}
