import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Backoffice } from '../pages/backoffice'
import { Login } from '../pages/login'
import { Main } from '../pages/main'
import { Register } from '../pages/register'
import { ProductDashboard } from '../pages/admin'
import { CartPage } from '../pages/cart'
import { ProductView } from '../pages/productView'
import { useSelector } from 'react-redux'
import { Forbidden } from '../pages/forbidden'

const Router = () => {
  const isAdmin = useSelector(state => state.session.admin);

  // Configuración de rutas
  return createBrowserRouter([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/backoffice/*',
      element: <Backoffice />,
    },
    {
      path: '/*',
      element: <Main />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/admin',
      element: isAdmin ? <ProductDashboard /> : <Navigate to="/forbidden" replace />,
    },
    {
      path: '/forbidden',
      element: <Forbidden />,
    },
    {
      path: '/carrito',
      element: <CartPage />,
    },
    {
      path: '/product/:id',
      element: <ProductView />,
    },
  ]);
};

export default Router;