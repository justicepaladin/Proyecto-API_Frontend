import { API_CLIENT } from "../api/client";





//Nota: debo renderizar los errores en la vista
export async function getProducts() 
{
    try 
    {
        const response = await API_CLIENT().get(`/productos`);
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
        const response = await API_CLIENT().post(`/productos`, newProduct);
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
        const response = await API_CLIENT().put(`/productos/${updatedProduct.id}`, updatedProduct);
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
        await API_CLIENT().delete(`/productos/${productId}`);
    } 
    catch (error) 
    {
        console.error("Error al eliminar el producto:", error);
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