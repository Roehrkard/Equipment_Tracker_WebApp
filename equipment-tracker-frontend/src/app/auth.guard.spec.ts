import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    if (this.isTokenExpired()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  isTokenExpired(): boolean {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      const tokenData = JSON.parse(atob(authToken.split('.')[1]));
      const expirationDate = new Date(tokenData.exp * 1000); 
      return expirationDate <= new Date();
    }
    return true; 
  }
}
