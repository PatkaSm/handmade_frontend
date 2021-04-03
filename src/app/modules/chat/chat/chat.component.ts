import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IMessage } from 'src/app/core/interfaces/chat.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChatService } from 'src/app/core/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @Input() messages: IMessage[];

  controls = {
    content: new FormControl(''),
  };

  form = new FormGroup(this.controls);

  constructor(
    public authService: AuthService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {}

  submit() {
    this.chatService.sendMessage({
      message: this.controls.content.value,
      senderId: this.authService.myData.id,
    });
    this.controls.content.setValue('');
  }
}
