import "./Nav.css"; // Estilizado del Nav
//icons
import { AiOutlineShoppingCart, AiOutlineUserAdd, AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { FiHeart, FiHome } from "react-icons/fi";
import { useDispatch } from "react-redux";

import { cleanSession, loginSuccess } from '../store/sessionReducer';
import { useNavigate } from "react-router-dom";

export const Nav = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleLogout = () => {
        console.log("Cerrar Sesión");
        dispatch(cleanSession({}));
        localStorage.removeItem("JWT")
        navigate("/login")
    }
  return (
    <nav>
        <a onClick={e => navigate("/")}>
                <FiHome className="nav-icons" />
            </a>
        <div className="nav-container">
            <input 
                type="text" 
                className="search-input"
                placeholder="Buscar" 
            />
        </div>
        <div className="profile-container">
            <a href="a">
                <FiHeart className="nav-icons" />
            </a>
            <a onClick={e => navigate("/carrito")}>
                <AiOutlineShoppingCart className="nav-icons" />
            </a>
            <a onClick={(e) => navigate("/profile")}>
                <AiOutlineUser className="nav-icons" />
            </a>
            {/*Icono de Logout */}
            <a onClick={handleLogout} style={{cursor: 'pointer'}}><AiOutlineLogout className="nav-icons" /></a>
        </div>
    </nav>
  )
}
