import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";


const Card2 = ({id, img, title, author, setLoading}) => {
    const {ref, inView } = useInView();

    if(localStorage.getItem('continue') == null){
        localStorage.setItem('continue', '[]');
    }
    let old_books = JSON.parse(localStorage.getItem('continue'));

    function removeBook(){
        //old_books = old_books.filter(item => item !== id);
        //localStorage.setItem('continue', JSON.stringify(old_books));
        const index = old_books.indexOf(id);
        old_books = old_books.splice(index, 1);
        console.log(old_books);

    }
    
    return (
        <>
        <button onClick={removeBook()}>X</button>
        <Link to={`/bookinfo/${id}`} onClick={()=>{
            setLoading(true);
            setTimeout(()=>{
                setLoading(false)
            }, 500)
            window.scrollTo(0, 0);
        }}>
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

export default Card2;