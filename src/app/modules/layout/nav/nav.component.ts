import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ModalService } from 'src/app/shared/modal/modal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  modalID = this.modalService.generatedId.toString();

  constructor(
    public modalService: ModalService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}
}
