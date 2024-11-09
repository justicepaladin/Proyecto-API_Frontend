import { API_CLIENT } from "./client"

export const login = (email, password) => {
    return API_CLIENT().post('auth/login', { email, password })
}

export const register = (email, password, usuario, fecha_nacimiento, nombre, apellido ) => {
    // OBJETO QUE SE PASA A DTO EN BACKEND
    return API_CLIENT().post('auth/registro', {email, password, usuario, fecha_nacimiento, nombre, apellido})
}