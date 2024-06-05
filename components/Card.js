import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const Card = ({id, img, title, author}) => {
    const {ref, inView } = useInView();
    return (
        <>
        <Link to={`/bookinfo/${id}`}>
        <div ref={ref} className={`${inView ? 'card_body' : 'card_body_hidden'}`}>
            <img src={img} className="cardImg"/>
            <div className="book_info">
            <div className="book_title">{title}</div>
            <div className="author_name">{author}</div>
            </div>
            
        </div>
        </Link>
        </>
    )
}

export default Card;