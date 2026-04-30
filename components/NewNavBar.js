import { Link } from "react-router-dom";
import Title from "./Title";
import Menu from "../files/menu.svg?url";
import MenuOrange from "../files/menuorange.svg?url";
import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import NewLogo from "../files/plot_twist.svg?url"
import NewLogoOrange from "../files/plot_twist_orange.svg?url"

const NewNavBar = () => {
    const [menu, setMenu] = useState(Menu);
    const [clicked, setClicked] = useState(false);
    const [img, setImg] = useState(NewLogo);
   
    return (
        <div className="new_logo_header">

            
            
            <div className={"new_nav_items" + `${clicked ? "active" : "" }`}>

                <div className="new_title">
                        <div>
                            <Link to="/books">
                            <img src={img} style={{width:"100px", cursor:"pointer"}}
                            onMouseEnter={()=>{
                                setImg(NewLogoOrange);
                            }}
                            onMouseOut={()=>{
                                setImg(NewLogo);
                            }}
                            /></Link>
                        </div>
                </div>

                <ul>
                    <li><Link to="/books">Home</Link></li>
                    <li><Link to="/library">Library</Link></li>
                    <li><Link to="/quotes">Quotes</Link></li>
                    <li><Link to="/highlights">Highlights</Link></li>
                    <li><Link to="/categories">Genres and Categories</Link></li>
                    <li><Link to="/search">Search Books</Link></li>
                    
                </ul>
            <div>
                <img 
                    src={menu} 
                    style={{
                        width: "30px", 
                        position: "absolute", 
                        right: "10px", 
                        top: "40px", 
                        cursor: "pointer"
                    }}
                    onMouseEnter={() => {
                        setMenu(MenuOrange);
                    }}
                    onMouseLeave={() => {
                        setMenu(Menu);
                    }} 
                    className="menu_button"
                    onClick={() => {
                        setClicked((prev) => !(prev))
                    }}
                />
            </div>
            
            {/* Add mobile/responsive authentication buttons */}
            <div className="auth-buttons-mobile" style={{ position: "absolute", top: "40px", right: "50px" }}>
                <SignedOut>
                    <SignInButton mode="modal" > 
                        <a className="nav-items" style={{cursor:"pointer", fontFamily:"League Spartan" }}>Sign In</a>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                </SignedIn>
            </div>
                </div>
            
        </div>
    );
};

export default NewNavBar;