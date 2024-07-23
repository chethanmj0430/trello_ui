import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from "./add-task/add-task.component";

interface Task {
  title: string;
  description: string;
  createdAt: string;
}

interface TaskCategories {
  todo: Task[];
  inProgress: Task[];
  done: Task[];
}

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, AddTaskComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  searchQuery: string = '';
  sortBy: string = 'recent';
  tasks: TaskCategories = {
    todo: [
      { title: 'Task 1', description: 'Description1', createdAt: '2024-07-24' },
      { title: 'Task 2', description: 'Description2', createdAt: '2024-07-24' },
      { title: 'Task 3', description: 'Description3', createdAt: '2024-07-24' },
    ],
    inProgress: [
      { title: 'Task 4', description: 'Description4', createdAt: '2024-07-24' },
      { title: 'Task 5', description: 'Description5', createdAt: '2024-07-24' },
    ],
    done: [
      { title: 'Task 6', description: 'Description6', createdAt: '2024-07-24' },
      { title: 'Task 7', description: 'Description7', createdAt: '2024-07-24' },
    ]
  };

  draggedTask: Task | null = null;
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
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

  onSearchChange(searchValue: string): void {
    this.searchQuery = searchValue;
    console.log('Search Query:', this.searchQuery);
  }

  onSortChange(sortValue: string): void {
    this.sortBy = sortValue;
    console.log('Sort By:', this.sortBy);
  }
}
