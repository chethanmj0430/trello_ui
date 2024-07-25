import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from './../task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})
export class EditTaskComponent {

  @Input() task: Task | null = null;
  @Output() updateTask = new EventEmitter<Task>();
  @Output() closeModal = new EventEmitter<void>();

  taskCopy: Task | undefined;
  taskName = '';
  description = '';
  createdTime = new Date();
  assignedTo = '';
  developers: string[] = [
    'Harshitha',
    'Deeksha',
    'Swaroopa',
    'Nischitha',
    'Yatham',
  ];

  ngOnInit() {
    // Make a copy of the task to edit
    this.taskCopy = { ...this.task! };
  }

  save() {
    this.updateTask.emit(this.taskCopy);
    this.close();
  }

  onSubmit() {
    if (this.task) {
      // Emit the updated task object
      this.updateTask.emit(this.task);
      this.close();
    }
  }

  close() {
    this.closeModal.emit();
  }
}
