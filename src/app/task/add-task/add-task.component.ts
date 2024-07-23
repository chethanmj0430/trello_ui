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

  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  taskName: string = '';
  description: string = '';

  close() {
    this.closeModal.emit();
  }

  onSubmit() {
    console.log('Task Name:', this.taskName);
    console.log('Description:', this.description);
    this.close(); // Close modal on form submit
  }
}
