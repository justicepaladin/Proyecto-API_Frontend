import './Nav.css' // Estilizado del Nav
//icons
import {
  AiOutlineShoppingCart,
  AiOutlineUserAdd,
  AiOutlineLogout,
  AiOutlineUser,
} from 'react-icons/ai'
import { FiHeart, FiHome, FiLock } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'

import { cleanSession, loginSuccess } from '../store/sessionReducer'
import { useNavigate } from 'react-router-dom'
import { Badge } from '@mui/material'

export const Nav = () => {
  const dispatch = useDispatch()
  const carrito = useSelector((state) => state.carrito.items)
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(cleanSession({}))
    localStorage.removeItem('JWT')
    navigate('/login')
  }
  return (
    <nav>
      <a onClick={(e) => navigate('/')}>
        <FiHome className="nav-icons" />
      </a>
      <a onClick={(e) => navigate('/admin')}>
        <FiLock className="nav-icons" />
      </a>
      <div className="nav-container">
        <input type="text" className="search-input" placeholder="Buscar" />
      </div>
      <div className="profile-container">
        <a href="a">
          <FiHeart className="nav-icons" />
        </a>
        <a onClick={(e) => navigate('/carrito')}>
          <Badge
            badgeContent={carrito?.length}
            color="primary"
            overlap="circular"
          >
            <AiOutlineShoppingCart className="nav-icons" />
          </Badge>
        </a>
        <a onClick={(e) => navigate('/profile')}>
          <AiOutlineUser className="nav-icons" />
        </a>
        {/*Icono de Logout */}
        <a onClick={handleLogout} style={{ cursor: 'pointer' }}>
          <AiOutlineLogout className="nav-icons" />
        </a>
      </div>
    </nav>
  )
}
