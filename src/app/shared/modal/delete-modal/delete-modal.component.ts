import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit {
  @Input() modalID: string;
  @Input() object: string;
  @Input() objectType: string;

  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor(public modalService: ModalService) {}

  ngOnInit(): void {}
}
