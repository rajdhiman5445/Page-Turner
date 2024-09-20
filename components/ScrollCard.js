import { Link } from "react-router-dom";
const ScrollCard = ({link, img, title}) => {
    return (
        <>
        <Link to={link}>
        <div className="scroll_card">
            <img src={img} className="scroll_img" alt={title}/>
        </div>
        </Link>
        </>
    )
}

export default ScrollCard;