import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobCardComponent } from './job-card/job-card.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [JobCardComponent, ModalComponent],
  imports: [CommonModule],
  exports: [JobCardComponent, ModalComponent],
})
export class SharedModule {}
