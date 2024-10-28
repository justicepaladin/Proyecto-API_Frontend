import axios from "axios";
import { API_URL } from "../utils";

export async function getProfile(){
    let response = await axios.get(`${API_URL}/users/1`)

    console.log(response.data)
    return response.data
}