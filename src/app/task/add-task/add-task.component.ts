import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {

  @Input() isModalOpen: boolean = false;

  taskName: string = '';
  description: string = '';
  developers: string[] = [
    'Harshitha',
    'Deeksha',
    'Swaroopa',
    'Nischitha',
    'Yatham',
  ];


  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  onClose() {
    this.closeModal.emit();
  }

  onSubmit() {
    if (this.taskName && this.description) {
      // Handle form submission logic
      console.log('Task Name:', this.taskName);
      console.log('Description:', this.description);

      // Emit event to close modal after submission
      this.onClose();
    }
  }

}
