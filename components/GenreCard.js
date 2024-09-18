import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const GenreCard = ({img, genre}) => {
    const {ref, inView } = useInView();
    return(
        <>
        <Link to={`/result/${genre}`}>
        <div>
            <img src={img} ref={ref} className={`${inView ? 'genreCard' : 'genreCard_hidden'}`} />
        </div>
        </Link>
        </>
    )
}

export default GenreCard;