import "./Nav.css"; // Estilizado del Nav
//icons
import { AiOutlineShoppingCart, AiOutlineUserAdd } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";

function Nav() {
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
        </div>
    </nav>
  )
}

export default Nav;