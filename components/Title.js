import { useState } from "react";
import Logo from "../files/page_turner_logo.svg"
import LogoOrange from "../files/page_turner_logo_orange.svg"
import { Link } from "react-router-dom";
import NewLogo from "../files/plot_twist.svg"
import NewLogoOrange from "../files/plot_twist_orange.svg"


const Title =() => {
    

    const [img, setImg] = useState(NewLogo);
    

    return(
        
        <>
        
        <div className="title">
            <div>
                <Link to="/books">
                <img src={img} style={{width:"100px", alignItems:"center", cursor:"pointer"}}
                onMouseEnter={()=>{
                    setImg(NewLogoOrange);
                }}
                onMouseOut={()=>{
                    setImg(NewLogo);
                }}
                /></Link>
            </div>
            
        </div>
        
        </>
    )
}

export default Title;