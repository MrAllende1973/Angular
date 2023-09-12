import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service'; // Asegúrate de tener la ruta correcta a tu servicio
import {UserI} from '../../models/user.interface'; // Asegúrate de tener la ruta correcta a tu interfaz

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  users: UserI[] = []; // Almacenará la lista de usuarios obtenidos desde la API.
  newUser: UserI = { // Objeto que representa al nuevo usuario que se desea crear.
    id: 0,
    name: '',
    email: '',
    password: ''
  };

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.apiService.getAllUsers().subscribe(
      (response: any) => {
        this.users = response;
      },
      error => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }

  onCreateUser() {
    this.apiService.createUser(this.newUser).subscribe(
      (response) => {
        console.log(response);
        this.fetchUsers(); // Luego de crear un usuario, recarga la lista de usuarios.
      },
      (error) => {
        console.error('Error al crear el usuario:', error);
      }
    );
  }

}
