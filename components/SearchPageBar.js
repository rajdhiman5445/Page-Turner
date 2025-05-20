
import { useEffect, useState, useRef } from "react";
import Logo from "../files/page_turner_logo.svg"
import LogoOrange from "../files/page_turner_logo_orange.svg"
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Close from "../files/close.svg"
import CloseOrange from "../files/closeorange.svg"
import NewLogo from "../files/plot_twist.svg"
import NewLogoOrange from "../files/plot_twist_orange.svg"



const SearchPageBar =({searchText, setSearchText, booksInfo, setSearchResult, handleKeyDown}) => {
    const [img, setImg] = useState(NewLogo);
    const [icon, setIcon] = useState(Close);

    const navigate = useNavigate();
    const inputRef = useRef(null);


    useEffect(() => {
        inputRef.current.focus();
      }, []);

    return(
        <div className="search_title">
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
            <input type="text" className="search-bar" ref={inputRef} value={searchText} onChange={(e)=>{
                setSearchText(e.target.value);
            }} onKeyDown={handleKeyDown} />
            </div>
            <div>
            <img src={icon} style={{width:"30px", cursor:"pointer", margin:"10px"}}
                onMouseEnter={()=>{
                    setIcon(CloseOrange);
                }}
                onMouseOut={()=>{
                    setIcon(Close);
                }}

                onClick={()=> navigate(-1)}
            />
            </div>
        </div>
    )
}

export default SearchPageBar;