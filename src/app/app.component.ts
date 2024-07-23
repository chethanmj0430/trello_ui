import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'trello_ui';

  isLoginPage = false;
  isSignupPage = false;
  isLoginActive = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isLoginPage = this.router.url === '/login';
      this.isSignupPage = this.router.url === '/signup';
      this.isLoginActive = this.isLoginPage;
    });
  }

  navigateTo(route: string) {
    this.isLoginActive = (route === 'login');
    this.router.navigate([route]);
    this.isLoginActive = true;
  }

  logout(route: string) {
    this.isLoginActive = (route === 'login');
    this.router.navigate([route]);
  }
}
