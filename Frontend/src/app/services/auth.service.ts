import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { listaAdministrativos, listaMecanicos, datosAdministrativosModificar, datosMecanicoModificar, RespuestaCliente } from '../models/usuarios.interface';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private URL = 'http://localhost:5000/api';
  constructor(private http: HttpClient, private router: Router) { }

  obtenerReparaciones() {
    return this.http.get<any[]>(this.URL + '/reparaciones');
  }

  crearCliente ( cuerpo:{nombre: string, telefono: string, correo_electronico: string} ): Observable<RespuestaCliente> {
    return this.http.post<RespuestaCliente>(this.URL + '/crearCliente', cuerpo);
  }

  crearMaquina ( cuerpo:{referencia:string, horas_trabajo: Number, kilometros: Number, marca: string, modelo: string, ano_matriculacion: Date, tipo:string, clienteId: Object} ) {
    return this.http.post(this.URL + '/crearMaquina', cuerpo);
  }

  crearReparacion ( cuerpo:{id_maquina:string, h_mano_de_obra:string, fecha_reparacion:string, precio_piezas:string, descripcion_reparacion:string, total:string} ): Observable<RespuestaCliente> {
    return this.http.post<RespuestaCliente>(this.URL + '/crearReparacion', cuerpo);
  }

  enviarCorreo( cuerpo: {correo:string; asunto: string; contenido: string;}){
    return this.http.post(this.URL + '/enviar-correo', cuerpo);
  }

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

  delete(nombre_usuario: string) {
    return this.http.delete(`${this.URL}/delete/${nombre_usuario}`);
  }

  modificarUsuario(nuevoNombreUsuario: string, user: datosAdministrativosModificar | datosMecanicoModificar): Observable<any> {
    console.log(nuevoNombreUsuario);
    console.log(user);
    return this.http.put<any>(`${this.URL}/modificarUsuario/${nuevoNombreUsuario}`, user);
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
