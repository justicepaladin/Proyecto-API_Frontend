import axios from "axios";
import { API_URL } from "../utils";

export async function getFacturas(page, rowsPerPage){
    let response = await axios.get(`${API_URL}/factura`)
    return response.data
}