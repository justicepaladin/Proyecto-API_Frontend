import axios from "axios";
import { API_URL } from "../utils";

//Nota: debo renderizar los errores en la vista
export async function getProducts() 
{
    try 
    {
        const response = await axios.get(`${API_URL}/productos`);
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
        const response = await axios.post(`${API_URL}/productos`, newProduct);
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
        const response = await axios.put(`${API_URL}/productos/${updatedProduct.id}`, updatedProduct);
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
        await axios.delete(`${API_URL}/productos/${productId}`);
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
        const response = await axios.get(`${API_URL}/productos/${productId}`);
        return response.data;
    } 
    catch (error) 
    {
        console.error("Error al obtener el producto:", error);
        throw error;
    }
}