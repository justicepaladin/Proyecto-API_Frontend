import { API_CLIENT } from "../api/client";


export async function getProducts(page, filtros, rowsPerPage) {
    try {
        // Crear un objeto URLSearchParams con paginación
        const queryParams = new URLSearchParams({
            page: page,
            rowsPerPage: rowsPerPage ?? 10,
        });
        console.log(filtros)
        filtros?.map(filtro => {
            queryParams.append("categorias", filtro.id)
        })


        // Convertir los parámetros en una cadena de consulta
        const queryString = queryParams.toString();

        // Construir la URL con los parámetros
        const response = await API_CLIENT().get(`/v1/producto?${queryString}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        throw error;
    }
}


export async function addProduct(newProduct) {
    try {
        const response = await API_CLIENT().post(`/producto`, newProduct);
        return response.data;
    }
    catch (error) {
        console.error("Error al agregar el producto:", error);
        throw error;
    }
}

export async function editProduct(updatedProduct) {
    try {
        const response = await API_CLIENT().put(`/producto/${updatedProduct.id}`, updatedProduct);
        return response.data;
    }
    catch (error) {
        console.error("Error al editar el producto:", error);
        throw error;
    }
}

export async function deleteProduct(productId) {
    try {
        await API_CLIENT().delete(`/producto/${productId}`);
    }
    catch (error) {
        console.error("Error al eliminar el producto:", error);
        throw error;
    }
}


export async function modificarStock(productoId, stock) {
    try {
        let response = await API_CLIENT().put(`/producto/${productoId}/stock/${stock.id}`, stock);

        return response
    }
    catch (error) {
        console.error("Error al actualizar el producto:", error);
        throw error;
    }
}


export async function createStock(productoId, stock) {
    try {
        stock.id = null
        let response = await API_CLIENT().post(`/producto/${productoId}/stock`, stock);
        return response
    }
    catch (error) {
        console.error("Error al crear el stock:", error);
        throw error;
    }
}


export async function deleteStock(prodId, stockId) {
    console.log("delete stock")
    try {
        await API_CLIENT().delete(`/producto/${prodId}/stock/${stockId}`);
    }
    catch (error) {
        console.error("Error al eliminar el stock:", error);
        throw error;
    }
}


export async function getCategorias() {
    try {
        let response = await API_CLIENT().get(`/v1/producto/categoria`);

        return response
    }
    catch (error) {
        console.error("Error al obtener categorias:", error);
        throw error;
    }
}


export async function getProductById(productId) {
    try {
        const response = await API_CLIENT().get(`/producto/${productId}`);
        return response.data;
    }
    catch (error) {
        console.error("Error al obtener el producto:", error);
        throw error;
    }
}

export const listarProductosVistosRecientemente = (page, rowsPerPage) => {
    return API_CLIENT().get(`v1/producto/recientes?page=${page}&rowsPerPage=${rowsPerPage}`)
        .then(response => response.data)
}

export const marcarVisto = (idProducto) => {
    return API_CLIENT().post(`v1/producto/${idProducto}/visto`)
}

export const listaProductosDestacados = (page, rowsPerPage) => {
    return API_CLIENT().get(`v1/producto/destacados?page=${page}&rowsPerPage=${rowsPerPage}`)
        .then(response => response.data)
}

export const darQuitarFav = (idProducto) => {
    return API_CLIENT().post(`v1/producto/${idProducto}/favorito`)
}