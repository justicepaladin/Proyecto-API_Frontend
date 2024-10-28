import axios from 'axios';
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

instance.defaults.headers.post['Content-Type'] = 'application/json'

instance.interceptors.response.use((response) => {
    response.ok = response.status === 200
    return response;
});

export default instance;