import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/models/login-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: LoginRequest = {
    username: '',
    password: ''
  };

  errorMsg: string = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    console.log('Clicked:', this.user);

    if (!this.user.username || !this.user.password) {
      this.errorMsg = 'Username and Password are required';
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    this.auth.login(this.user).subscribe({
      next: (res: any) => {
        console.log('Login Success:', res);
        this.router.navigate(['/students']);
      },
      error: (err) => {
        console.error('Login Error:', err);
        this.errorMsg = err.error?.message || 'Invalid login';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}