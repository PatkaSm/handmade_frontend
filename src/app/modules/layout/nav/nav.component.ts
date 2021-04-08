import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ModalService } from 'src/app/shared/modal/modal.service';

/**
 * Nac component
 */
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  /**
   * Login modal ID
   */
  modalID = this.modalService.generatedId.toString();

  /**
   * Navigation component constructor
   * @param modalService Modal service
   * @param authService authentication service
   */
  constructor(
    public modalService: ModalService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}

  sumbenuToggle(submenu: HTMLElement) {
    submenu.classList.toggle('submenu--active');
  }
}
