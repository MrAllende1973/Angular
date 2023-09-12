import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    
    if (token) {
      // Si hay un token, el usuario está autenticado
      return true;
    }

    // Si no hay un token, redirige al login
    this.router.navigate(['/login']);
    return false;
  }
}