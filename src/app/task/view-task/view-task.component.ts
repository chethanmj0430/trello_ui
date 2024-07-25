import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from './../task.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent {
  @Input() task: Task | null = null;
  @Output() closeModal = new EventEmitter<void>();

  onClose() {
    this.closeModal.emit();
  }
}
