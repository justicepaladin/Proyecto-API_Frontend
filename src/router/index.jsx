import { createBrowserRouter } from "react-router-dom";
import { Products } from "../Products/Products";
import { PerfilPage } from "../pages/perfil";



export default createBrowserRouter([
    {
        path: "/",
        element: <Products />
    },
    {
        path: "/profile",
        element: <PerfilPage />
    },
])