import { API_CLIENT } from "./client"

export const listarProductosVistosRecientemente = (page, rowsPerPage) => {
    return API_CLIENT().get(`v1/producto/recientes?page=${page}&rowsPerPage=${rowsPerPage}`)
}

export const marcarVisto = (idProducto) => {
    return API_CLIENT().post(`v1/producto/${idProducto}/visto`)
}