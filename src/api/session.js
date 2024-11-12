import { API_CLIENT } from "./client"

export const login = (email, password) => {
    return API_CLIENT().post('auth/login', { email, password })
}

export const register = (email, password, usuario, fecha_nacimiento, nombre, apellido) => {
    return API_CLIENT().post('auth/registro', { email, password, usuario, fecha_nacimiento, nombre, apellido })
}