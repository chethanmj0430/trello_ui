import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../task.model';

@Component({
  selector: 'app-delete-task',
  standalone: true,
  imports: [],
  templateUrl: './delete-task.component.html',
  styleUrl: './delete-task.component.scss'
})
export class DeleteTaskComponent {
  @Input() task: Task | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() confirmDelete = new EventEmitter<Task>();
  

  onClose() {
    this.closeModal.emit();
    console.log(this.task)
  }
}
