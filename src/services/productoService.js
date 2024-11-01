import axios from "axios";
import { API_URL } from "../utils";

export async function getProductos(page, rowsPerPage)
{
    let response = await axios.get(`${API_URL}/producto`)
    return response.data
}