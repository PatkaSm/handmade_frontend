import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  /**
   * Modal ID
   */
  @Input() id: string;

  /**
   * Modal title
   */
  @Input() title = ' ';

  /**
   * emit Scroll event
   */
  @Input() emitScroll = false;

  /**
   * Show close button
   */
  @Input() showClose = true;

  /**
   * Animation direction
   */
  @Input() direction = 'up';

  /**
   * Animation direction
   */
  @Input() class = '';

  /**
   * Modal closed event emitter
   */
  @Output() hasClosed: EventEmitter<any> = new EventEmitter();

  /**
   * Modal closed event emitter
   */
  @Output() scrollPosition: EventEmitter<any> = new EventEmitter();

  /**
   * Modal native element
   */
  private element: any;

  /**
   * Close modal duration in ms
   */
  private closeModalDuration = 300;

  /**
   * Set element as modal native element
   *
   * @param {UIModalService} modalService UI Modal Service
   * @param {ElementRef} el Element Ref
   * @param {string} platformId Platform ID
   */
  constructor(
    public modalService: ModalService,
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: string
  ) {
    this.element = el.nativeElement;
  }

  /**
   * Prepare modal
   */
  ngOnInit(): void {
    const modal = this;

    if (!this.id) {
      return;
    }

    // Check if platform is browser
    if (isPlatformBrowser(this.platformId)) {
      /**
       * Add modal to body
       */
      document.body.appendChild(this.element);

      /**
       * Add event listener to click out of modal
       */
      this.element.addEventListener('mousedown', (e: any) => {
        if (e.target.classList.contains('modal')) {
          this.modalService.close(this.id);
        }
      });

      /**
       * Register new modal
       */
      this.modalService.add(this);
    }
  }

  /**
   * Remove modal after component was destroyed
   */
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  /**
   * Open modal
   */
  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('modal-open');
  }

  /**
   * Close modal
   */
  close(): void {
    const elem = this.element.querySelector('.overflow-hidden');
    if (elem) {
      this.element.querySelector('.overflow-hidden');
    }

    document.body.classList.add('modal-closed');
    this.hasClosed.emit();
    setTimeout(() => {
      this.element.style.display = 'none';
      document.body.classList.remove('modal-open');
      document.body.classList.remove('modal-closed');
    }, this.closeModalDuration);
  }

  onElementScroll(event) {
    if (this.emitScroll) {
      this.scrollPosition.emit(event.target.scrollTop);
    }
  }
}
