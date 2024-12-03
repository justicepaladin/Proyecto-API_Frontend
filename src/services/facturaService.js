

import { API_CLIENT } from "../api/client";



export async function getFacturas(page, rowsPerPage) {
    try {
        let response = await API_CLIENT().get(`/user/factura?page=${page}&rowsPerPage=${rowsPerPage}`)
        return response.data
    } catch (e) {
        throw e
    }
}


export async function efectuarCompra(items) {
    let body = {
        listItems: items
    }

    try {
        let response = await API_CLIENT().post('/factura', body)
        return response
    } catch (e) {
        throw e
    }
}