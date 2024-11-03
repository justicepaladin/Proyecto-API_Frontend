import "./Nav.css"; // Estilizado del Nav
//icons
import { AiOutlineShoppingCart, AiOutlineUserAdd, AiOutlineLogout } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import { useDispatch } from "react-redux";

import { cleanSession, loginSuccess } from '../store/sessionReducer';

export const Nav = () => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        console.log("Cerrar Sesión");
        dispatch(cleanSession({}));
        // TODO
        // CERRAR SESION (LIMPIAR EL TOKEN) - dispatch del cleansection
        // REDIRIGIR A INICIO DE SESION
    }
  return (
    <nav>
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
            <a href="a">
                <AiOutlineShoppingCart className="nav-icons" />
            </a>
            <a href="a">
                <AiOutlineUserAdd className="nav-icons" />
            </a>
            {/*Icono de Logout */}
            <a onClick={handleLogout} style={{cursor: 'pointer'}}><AiOutlineLogout className="nav-icons" /></a>
        </div>
    </nav>
  )
}
