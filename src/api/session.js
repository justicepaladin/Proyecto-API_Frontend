import { API_CLIENT } from "./client"

export const login = (email, password) => {
    return API_CLIENT().post('auth/login', { email, password })
}