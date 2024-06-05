import genres from "../data/genres";
import { Link } from "react-router-dom";

const Categories = () => {
    return(
        <>
        <div className="genre">

        <h1>Genres and Categories</h1>
        <div className="genre-list">
        <h2 className="genre-item">{genres.map((genre, index) => <span key={index}><Link to={`/result/${genre}`}>{genre + "  "}<br/></Link></span>)}</h2>
        </div>
        </div>
        
        </>
    )
}

export default Categories;