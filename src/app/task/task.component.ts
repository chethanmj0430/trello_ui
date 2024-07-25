import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from "./add-task/add-task.component";
import { ViewTaskComponent } from "./view-task/view-task.component";
import { DeleteTaskComponent } from "./delete-task/delete-task.component";
import { EditTaskComponent } from "./edit-task/edit-task.component";
import { Task } from './task.model';


interface TaskCategories {
  todo: Task[];
  inProgress: Task[];
  done: Task[];
}

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, AddTaskComponent, ViewTaskComponent, DeleteTaskComponent, EditTaskComponent],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'] // Ensure this is correct
})
export class TaskComponent {
  searchQuery: string = '';
  sortBy: string = 'recent';
  tasks: TaskCategories = {
    todo: [
      { id: 1, name: 'Task 1', description: 'Description1', createdTime: new Date('2024-07-24'), assignedTo: 'Harshitha' },
      { id: 2, name: 'Task 2', description: 'Description2', createdTime: new Date('2024-07-24'), assignedTo: 'Swaroopa' },
      { id: 3, name: 'Task 3', description: 'Description3', createdTime: new Date('2024-07-24'), assignedTo: 'Nischitha' },
    ],
    inProgress: [
      { id: 4, name: 'Task 4', description: 'Description4', createdTime: new Date('2024-07-24'), assignedTo: 'Deeksha' },
      { id: 5, name: 'Task 5', description: 'Description5', createdTime: new Date('2024-07-24'), assignedTo: 'Harshitha' },
    ],
    done: [
      { id: 6, name: 'Task 6', description: 'Description6', createdTime: new Date('2024-07-24'), assignedTo: 'Swaroopa' },
      { id: 7, name: 'Task 7', description: 'Description7', createdTime: new Date('2024-07-24'), assignedTo: 'Nischitha' },
    ]
  };
  

  draggedTask: Task | null = null;
  isModalOpen: boolean = false;
  isModalView: boolean = false;
  isModalEdit: boolean = false;
  isModalDelete: boolean = false;

  selectedTask: Task | null = null;

  openModal() {
    this.isModalOpen = true;
    this.resetModalStates();
  }

  openViewModal(task: Task) {
    console.log("Open View Modal called with task:", task);
    this.isModalView = true;
    this.selectedTask = task;
  }

  openEditModal(task: Task) {
    this.isModalEdit = true;
    this.selectedTask = task;
  }

  openDeleteModal(task: Task) {
    this.isModalDelete = true;
    this.selectedTask = task;
  }

  closeModal() {
    this.isModalOpen = false;
    this.isModalView = false;
    this.isModalEdit = false;
    this.isModalDelete = false;
    this.selectedTask = null;
  }

  private resetModalStates() {
    this.isModalView = false;
    this.isModalEdit = false;
    this.isModalDelete = false;
  }

  onDragStart(event: DragEvent, task: Task) {
    this.draggedTask = task;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent, column: keyof TaskCategories) {
    event.preventDefault();

    if (this.draggedTask) {
      const currentColumn = this.getColumnContainingTask(this.draggedTask);
      if (currentColumn) {
        this.tasks[currentColumn] = this.tasks[currentColumn].filter(task => task !== this.draggedTask);
      }

      if (column in this.tasks) {
        this.tasks[column].push(this.draggedTask);
      }

      this.draggedTask = null;
    }
  }

  private getColumnContainingTask(task: Task): keyof TaskCategories | null {
    for (const key in this.tasks) {
      if (this.tasks[key as keyof TaskCategories].includes(task)) {
        return key as keyof TaskCategories;
      }
    }
    return null;
  }

  onSearchChange(event: Event): void {
    // Type assertion to specify the target is an HTMLInputElement
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value; // Access the value property
    console.log('Search Query:', this.searchQuery);
  }

  onSortChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; // Type assertion
    this.sortBy = selectElement.value;
    console.log('Sort By:', this.sortBy);
  }

  addTask(task: Task, column: keyof TaskCategories) {
    this.tasks[column].push(task);
  }

  editTask(updatedTask: Task) {
    const currentColumn = this.getColumnContainingTask(updatedTask);
    if (currentColumn) {
      const taskIndex = this.tasks[currentColumn].findIndex(task => task.id === updatedTask.id);
      if (taskIndex !== -1) {
        this.tasks[currentColumn][taskIndex] = updatedTask;
      }
    }
  }

  deleteTask(taskToDelete: Task) {
    const currentColumn = this.getColumnContainingTask(taskToDelete);
    if (currentColumn) {
      this.tasks[currentColumn] = this.tasks[currentColumn].filter(task => task.id !== taskToDelete.id);
    }
  }
}
