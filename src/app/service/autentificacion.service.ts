import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {
  private perfilId!: number;

   private loggedIn: boolean = false;

  constructor(private router: Router) {}

  private userId: number | null = null;

  setUserId(id: number): void {
    this.userId = id;
  }

  getUserId(): number | null {
    return this.userId;
  }

  login(token: string): void {
    localStorage.setItem('token', token);
    this.loggedIn = true;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }



}
