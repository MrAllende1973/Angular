import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../servicios/api/api.service';
import { LoginI } from '../../models/login.interface';
import { ResponseI } from '../../models/response.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  // Variables para el manejo de errores
  errorStatus: boolean = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) { }

  ngOnInit(): void { 
    this.checkLocalStorage();
  }

  checkLocalStorage() {
    if(localStorage.getItem('token')){
      this.router.navigate(['dashboard']);
    }
  }

  onLogin() {
      if (this.loginForm.valid) {
        const formValue: LoginI = this.loginForm.value as LoginI;
        this.api.loginByEmail(formValue).subscribe(data => {
          if (data && data.token) {
            localStorage.setItem('token', data.token);
            this.router.navigate(['dashboard']);
          } else {
            this.errorStatus = true;
            this.errorMessage = 'Datos inválidos o usuario no registrado.';
          }
        }, error => {
          this.errorStatus = true;
          this.errorMessage = error;
        });
      } else {
        this.errorStatus = true;
        this.errorMessage = 'Por favor, complete todos los campos.';
      }
  }
}