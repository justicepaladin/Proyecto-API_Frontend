import { createBrowserRouter } from 'react-router-dom'
import { Backoffice } from '../pages/backoffice'
import { Login } from '../pages/login'
import { Main } from '../pages/main'
import { Register } from '../pages/register'
import { ProductDashboard } from '../pages/admin'

export default createBrowserRouter([
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
    path: "/admin",
    element: <ProductDashboard />,
  }
])
