import { Component } from '@angular/core';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  searchQuery: string = '';
  sortBy: string = 'recent';

  onSearchChange(searchValue: string): void {
    this.searchQuery = searchValue;
    console.log('Search Query:', this.searchQuery);
    // Implement search logic here
  }

  onSortChange(sortValue: string): void {
    this.sortBy = sortValue;
    console.log('Sort By:', this.sortBy);
    // Implement sorting logic here
  }
}
