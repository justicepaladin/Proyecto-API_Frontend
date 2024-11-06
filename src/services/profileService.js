import { API_CLIENT } from "../api/client"


export async function addProfile(newProfile){
    try 
    {
        const response = await API_CLIENT().post(`/users`, newProfile);
        return response.data;
    } 
    catch (error) 
    {
        console.error("Error al crear un usuario:", error);
        throw error; 
    }
}


export async function getProfile(){
    let response = await API_CLIENT().get(`/user`)

    return response.data
}