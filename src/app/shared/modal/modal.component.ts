import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Output() displayModal = new EventEmitter();
  constructor(private el: ElementRef) {
    document.body.style.overflow = 'hidden';
  }
  ngOnInit(): void {}

  closeModal() {
    this.displayModal.emit();
  }
}
