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

export interface AdministrativoI{
    _id: string;
    nombre_usuario: string;
    rol: string;
    nombre: string;
    apellido1: string;
    apellido2: string;
    contrasena: string;
    createdAt: string;
    updatedAt: string;
}