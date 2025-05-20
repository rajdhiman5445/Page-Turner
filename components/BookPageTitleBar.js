import { useState } from "react";
import Logo from "../files/page_turner_logo.svg"
import LogoOrange from "../files/page_turner_logo_orange.svg"
import { Link } from "react-router-dom";
import SearchWhite from "../files/search-white.svg"
import SearchOrange from "../files/search-orange.svg"
import NewLogo from "../files/plot_twist.svg"
import NewLogoOrange from "../files/plot_twist_orange.svg"

const BookPageTitleBar =() => {
    const [img, setImg] = useState(NewLogo);
    const [icon, setIcon] = useState(SearchWhite);

    return(
        <div className="title_main">
            <div>
                <Link to="/">
                <img src={img} style={{width:"80px", cursor:"pointer"}}
                onMouseEnter={()=>{
                    setImg(NewLogoOrange);
                }}
                onMouseOut={()=>{
                    setImg(NewLogo);
                }}
                /></Link>
            </div>
            <div>
            <Link to="/search">
                <img src={icon} className="search_img"
                onMouseEnter={()=>{
                    setIcon(SearchOrange);
                }}
                onMouseOut={()=>{
                    setIcon(SearchWhite);
                }}
            />
            
            </Link>
            </div>
        </div>
    )
}

export default BookPageTitleBar;