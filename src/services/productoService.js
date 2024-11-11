import { API_CLIENT } from "../api/client";


//Nota: debo renderizar los errores en la vista
export async function getProducts() 
{
    try 
    {
        const response = await API_CLIENT().get(`/v1/producto?page=0&rowsPerPage=10`);
        return response.data;
    } 
    catch (error) 
    {
        console.error("Error al obtener los productos:", error);
        throw error;
    }
}

export async function addProduct(newProduct) 
{
    try 
    {
        const response = await API_CLIENT().post(`/producto`, newProduct);
        return response.data;
    } 
    catch (error) 
    {
        console.error("Error al agregar el producto:", error);
        throw error; 
    }
}

export async function editProduct(updatedProduct)
{
    try 
    {
        const response = await API_CLIENT().put(`/producto/${updatedProduct.id}`, updatedProduct);
        return response.data;
    } 
    catch (error) 
    {
        console.error("Error al editar el producto:", error);
        throw error;
    }
}

export async function deleteProduct(productId)
{
    try 
    {
        await API_CLIENT().delete(`/producto/${productId}`);
    } 
    catch (error) 
    {
        console.error("Error al eliminar el producto:", error);
        throw error;
    }
}


export async function modificarStock(productoId, stock){
    try 
    {
        let response = await API_CLIENT().put(`/producto/${productoId}/stock/${stock.id}`, stock);
        
        return response
    } 
    catch (error) 
    {
        console.error("Error al actualizar el producto:", error);
        throw error;
    }
}


export async function createStock(productoId, stock){
    try 
    {
        stock.id = null
        let response = await API_CLIENT().post(`/producto/${productoId}/stock`, stock);
        console.log(response)
        return response
    } 
    catch (error) 
    {
        console.error("Error al crear el stock:", error);
        throw error;
    }
}

export async function getProductById(productId)
{
    try 
    {
        const response = await API_CLIENT().get(`/producto/${productId}`);
        return response.data;
    } 
    catch (error) 
    {
        console.error("Error al obtener el producto:", error);
        throw error;
    }
}