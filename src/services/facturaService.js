

import { API_CLIENT } from "../api/client";



export async function getFacturas(page, rowsPerPage){
    let response = await API_CLIENT().get(`/user/factura`)
    return response.data
}


export async function efectuarCompra(items){
    let body = {
        listItems: items
    }

    try{
        let response = await API_CLIENT().post('/factura', body)
        return response
    }catch(e){
        return e
    }
}