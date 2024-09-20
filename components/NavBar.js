import { Link } from "react-router-dom";
import Title from "./Title";
import Menu from "../files/menu.svg"
import MenuOrange from "../files/menuorange.svg"
import { useState } from "react";

const NavBar = () => {
    const [menu, setMenu] = useState(Menu);
    const [clicked, setClicked] = useState(false);
   
    return (
        <div>
            <div className="title">
            <Title/>
            </div>
            
            <div className={"nav_items" + `${clicked ? "active" :"" }`}>
            <ul>
                
                <li><Link to="/books">Home</Link></li>
                <li><Link to="/library">Library</Link></li>
                <li><Link to="/quotes">Quotes</Link></li>
                <li><Link to="/highlights">Highlights</Link></li>
                <li><Link to="/categories">Genres and Categories</Link></li>
                <li><Link to="/search">Search Books</Link></li>
            </ul>
            </div>
            <div >
            <img src={menu} style={{width:"30px", position:"absolute", right:"10px", top:"40px", cursor:"pointer"}}
            onMouseEnter={()=>{
                setMenu(MenuOrange);
            }}
            onMouseLeave={()=>{
                setMenu(Menu);
            }} className="menu_button"
            onClick={()=>{
                setClicked((prev) => !(prev))
            }}
        
            />
        </div>
        </div>
    )
}

export default NavBar;