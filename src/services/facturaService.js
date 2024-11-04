

import { API_CLIENT } from "../api/client";



export async function getFacturas(page, rowsPerPage){
    let response = await API_CLIENT().get(`/user/factura`)
    return response.data
}