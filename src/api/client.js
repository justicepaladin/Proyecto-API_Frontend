import axios from 'axios';


export function API_CLIENT() {
    const instance = axios.create({
        baseURL: import.meta.env.VITE_API_URL
    });

    let authToken = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).session).jwt;

    if (authToken === null) {
        // This means that there ISN'T JWT and no user is logged in.
        instance.defaults.headers.common.Authorization = null;
    } else {
        // This means that there IS a JWT so someone must be logged in.
        instance.defaults.headers.common.Authorization = `Bearer ${authToken}`;
    }


    instance.defaults.headers.common['Content-Type'] = 'application/json'

    instance.interceptors.response.use((response) => {
        response.ok = response.status === 200
        return response;
    }, (error) => {
        if (error.status === 403) {
            // Se limpia lo persistido para forzar cerrado de sesion
            localStorage.removeItem("persist:root")
        }
        return Promise.reject(error)
    });

    return instance

}