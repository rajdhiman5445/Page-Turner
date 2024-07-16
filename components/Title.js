import { useState } from "react";
import Logo from "../files/page_turner_logo.svg"
import LogoOrange from "../files/page_turner_logo_orange.svg"
import { Link } from "react-router-dom";


const Title =() => {
    

    const [img, setImg] = useState(Logo);
    

    return(
        
        <>
        
        <div className="title">
            <div>
                <Link to="/home">
                <img src={img} style={{width:"100px", alignItems:"center", cursor:"pointer"}}
                onMouseEnter={()=>{
                    setImg(LogoOrange);
                }}
                onMouseOut={()=>{
                    setImg(Logo);
                }}
                /></Link>
            </div>
            
        </div>
        
        </>
    )
}

export default Title;