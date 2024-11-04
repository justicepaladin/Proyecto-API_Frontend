import axios from 'axios';


export function API_CLIENT(){
    const instance = axios.create({
        baseURL: import.meta.env.VITE_API_URL
    });

    let authToken = localStorage.getItem("JWT");
    if (authToken === null) {
        // This means that there ISN'T JWT and no user is logged in.
        instance.defaults.headers.common.Authorization = null;
    } else {
        // This means that there IS a JWT so someone must be logged in.
        instance.defaults.headers.common.Authorization = `Bearer ${authToken}`;
    }
    
    
    instance.defaults.headers.post['Content-Type'] = 'application/json'
    
    instance.interceptors.response.use((response) => {
        response.ok = response.status === 200
        return response;
    });


    return instance

}