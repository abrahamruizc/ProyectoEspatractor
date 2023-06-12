export interface listaAdministrativos {
    nombre_usuario: string;
    nombre: string;
    apellido1: string;
    apellido2: string;
}

export interface listaMecanicos {
    DNI: string;
    nombre_usuario: string;
    nombre: string;
    apellido1: string;
    apellido2: string;
}

export interface datosAdministrativosModificar {
    nuevo_nombre_usuario: string;
    nombre: string;
    apellido1: string;
    apellido2: string;
    nueva_contrasena: string;
}

export interface datosMecanicoModificar {
    nuevo_nombre_usuario: string;
    dni: string;
    nombre: string;
    apellido1: string;
    apellido2: string;
    nueva_contrasena: string;
}

export interface RespuestaCliente {
    _id: string; 
  }