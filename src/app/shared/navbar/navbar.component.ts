import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../models/login-request';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  role: string | null = '';
  errorMsg = '';

  // 👇 login form model
  user: LoginRequest = {
    username: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.refreshState();
  }

  refreshState() {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.role = this.auth.getRole();
  }

  login() {
    if (!this.user.username || !this.user.password) {
      this.errorMsg = 'Enter username & password';
      return;
    }

    this.auth.login(this.user).subscribe({
      next: () => {
        this.errorMsg = '';
        this.refreshState();
        this.router.navigate(['/students']);
      },
      error: (err) => {
        this.errorMsg = err.error?.message || 'Login failed';
      }
    });
  }

  logout() {
    this.auth.logout();
    this.refreshState();
    this.router.navigate(['/login']); // or '/'
  }
}