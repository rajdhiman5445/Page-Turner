import Quote from "./Quote";
import { Link } from "react-router-dom";

const Footer = () =>{
    return(
        
        <div className="footer">
            <div className="space"></div>
            <Quote/>
            <div style={{margin:"5%"}}></div>
            <div><Link to="https://github.com/rajdhiman5445/Page-Turner">© Page & Turner</Link></div>
            <div>Made with 🍀 in India</div>
        </div>
        
    )
}

export default Footer;