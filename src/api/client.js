import axios from 'axios';
const instance = axios.create({
    baseURL: "http://localhost:8080/"
});

instance.defaults.headers.post['Content-Type'] = 'application/json'

instance.interceptors.response.use((response) => {
    response.ok = response.status === 200
    return response;
});

export default instance;