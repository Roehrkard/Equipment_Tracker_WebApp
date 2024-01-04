import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { TokenService } from '../services/token.storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  providedPin: string = '';
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  onSubmit(event: Event) {
    event.preventDefault();
    this.errorMessage = '';

    this.userService.authenticateUser(this.username, this.providedPin).subscribe({
      next: (response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);

          this.router.navigate(['/equipment-checkout']);
        } else {
          this.errorMessage = 'Token not provided in the response';
        }
      },
      error: (error) => {
        if (error.status === 401) {
          this.errorMessage = 'Authentication failed. Invalid credentials.';
        } else {
          this.errorMessage = `Login error: ${error.message}`;
        }
      }
    });
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
