import { API_CLIENT } from "../api/client"




export async function getProfile(){
    let response = await API_CLIENT().get(`/user`)

    return response.data
}