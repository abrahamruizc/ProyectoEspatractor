import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:5000/api';
  constructor(private http: HttpClient, private router: Router) { }


  loginUsuario(user: { nombre_usuario: string; contrasena: string; }) {
    return this.http.post<any>(this.URL + '/login', user);
  }

  logged() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }


  getToken() {
    return localStorage.getItem('token');
  }

}
