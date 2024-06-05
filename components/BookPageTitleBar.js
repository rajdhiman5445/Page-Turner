import { useState } from "react";
import Logo from "../files/page_turner_logo.svg"
import LogoOrange from "../files/page_turner_logo_orange.svg"
import { Link } from "react-router-dom";
import SearchWhite from "../files/search-white.svg"
import SearchOrange from "../files/search-orange.svg"

const BookPageTitleBar =() => {
    const [img, setImg] = useState(Logo);
    const [icon, setIcon] = useState(SearchWhite);

    return(
        <div className="title_main">
            <div>
                <Link to="/">
                <img src={img} style={{width:"80px", cursor:"pointer"}}
                onMouseEnter={()=>{
                    setImg(LogoOrange);
                }}
                onMouseOut={()=>{
                    setImg(Logo);
                }}
                /></Link>
            </div>
            <div>
            <Link to="/search">
                <img src={icon} style={{width:"30px", cursor:"pointer", margin:"10px"}}
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