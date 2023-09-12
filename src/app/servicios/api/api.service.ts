import { Injectable } from '@angular/core';
import { LoginI } from '../../models/login.interface';
import { ResponseI } from '../../models/response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { UserI } from '../../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  loginByEmail(form: LoginI): Observable<ResponseI> {
    let direction = this.url + 'auth/login';
    return this.http.post<ResponseI>(direction, form).pipe(
      catchError(error => {
        console.error('Error en ApiService:', error);  // Log the technical error for debugging
        return throwError('Hubo un problema al iniciar sesión. Por favor, intenta de nuevo más tarde.');
      })
    );
  }

  getAllUsers(): Observable<UserI[]> {
    const token = localStorage.getItem('token');  // Obtiene el token del localStorage
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);  // Configura el encabezado con el token

    let direction = this.url + 'users/empleados';
    return this.http.get<UserI[]>(direction, { headers: headers }).pipe(
      catchError(error => {
        console.error('Error en ApiService:', error);
        return throwError('Hubo un problema al obtener los usuarios. Por favor, intenta de nuevo más tarde.');
      })
    );
  }

  // Este es el nuevo método para crear un usuario.
  createUser(user: UserI): Observable<ResponseI> {
    let direction = this.url + 'users/';  // Asume que la ruta para crear un usuario es '/users/'. Ajusta según tu API.
    return this.http.post<ResponseI>(direction, user).pipe(
      catchError(error => {
        console.error('Error en ApiService:', error);
        return throwError('Hubo un problema al crear el usuario. Por favor, intenta de nuevo más tarde.');
      })
    );
  }

}
