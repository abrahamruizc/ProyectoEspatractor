import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { listaAdministrativos, listaMecanicos } from '../models/usuarios.interface';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:5000/api';
  constructor(private http: HttpClient, private router: Router) { }

  crearUsuarioAdministrativo(user : {nombre_usuario: string; rol: string; nombre: string; apellido1: string; apellido2: string; contrasena: string;}){
    return this.http.post(this.URL + '/crearAdministrativo', user);
  }

  crearUsuarioMecanico(user : {nombre_usuario: string; rol: string; nombre: string; apellido1: string; apellido2: string; contrasena: string; DNI: string;}){
    return this.http.post(this.URL + '/crearMecanico', user);
  }

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

  getAdministrativos(rol:string):Observable<listaAdministrativos[]>{
    return this.http.get<listaAdministrativos[]>((this.URL + '/rol/' + rol));
  }

  getMecanicos(rol:string):Observable<listaMecanicos[]>{
    return this.http.get<listaMecanicos[]>((this.URL + '/rol/' + rol));
  }

  getToken() {
    return localStorage.getItem('token');
  }

}
