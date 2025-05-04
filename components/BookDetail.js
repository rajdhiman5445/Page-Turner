import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Buttons from "./Buttons";
import axios from "axios";
import BookPageTitleBar from "./BookPageTitleBar";
import Card from "./Card";
import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';
import Footer from "./Footer";
import { useInView } from "react-intersection-observer";
import server_url from "../data/url";



const BookDetail =()=>{
    const {ref, inView} = useInView();
    const params = useParams();

    const [bookInfo, setBooksInfo] = useState([])
    const [thisBookId, setThisBookId] = useState();
    const [loading, setLoading] = useState(false);




    useEffect(() => {
        axios.get(server_url)
            .then(response => {
                setBooksInfo(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(()=>{
        setThisBookId(params.id)
    }, [params.id]);

    const thisBook = bookInfo.find(book => book._id === thisBookId);
    
    const similarBook = bookInfo.filter(book => 
        book._id !== thisBookId &&
        book.genres.some(genre => thisBook.genres.includes(genre))
      );

    function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
    }

    

    const moreLikeThis = shuffleArray(similarBook).slice(0, 7);

    if(loading){
        return(
            <>
            <BookPageTitleBar/>
            <div className="msg">
            <h3 className="load_msg">Hang on, magic is just a moment away!</h3>
            <h4 className="load_msg">Connecting to the server, this may take a while.<br/> If the issue presist please reload the page.</h4>
            </div>
            <Footer />
            </>
        )
    }

    if (thisBook){
        return(
            <>
            <BookPageTitleBar/>
            <div className="main_book_page">
                <div className="circle"></div>
                <div className="img_part_book_page">
                    <div className="img_main_div">
                            <img src={thisBook.img_url} className="img_main" />
                        </div>
                        
                </div>
                <div className="text_part_book_page">
                    <div className="main_book_title">
                        <h1 >{thisBook.book_title}</h1>
                    </div>
                    <div className="main_author_name">
                        <h1><Link to={`/result/${thisBook.author_name}`}>{thisBook.author_name}</Link></h1>
                    </div>
                    <div className="stars">
                    <Rating name="read-only" defaultValue={Number(thisBook.value)} precision={0.5} readOnly />
                        <h2>{thisBook.year}</h2>
                    </div>
                    <div> 
                        <h2>in {thisBook.genres.map((genre, index) => <span key={index}><Link to={`/result/${genre}`}>{genre + " "}</Link></span>)}</h2>
                    </div>
                    <div className="btn_list">

                        <Link to={`/readbook/`+`${thisBook.url}`+`${thisBook.token}`}><Buttons text="Read Now" thisBookId={thisBookId}/></Link>
                        <Link to={thisBook.epub}><Buttons text="Download EPUB"/></Link>
                        <Link to={thisBook.buy} target="_blank" rel="noopener noreferrer"><Buttons text="Buy on Amazon"/></Link>
                    </div>
                </div>
        
            </div>

            <div ref={ref} className={'main_about'}>
                <div className="main_about_head">
                <h2 >About the book</h2>
                </div>
                <div className="about_book">
                    {(thisBook.quote)?(
                        <h4 style={{fontStyle:"italic"}}>{`"${thisBook.quote}"`}</h4>
                    ):<div></div>}
                    
                    <div className="text">{thisBook.about1}</div>
                    <br></br>
                   <div className="text">{thisBook.about2}</div>
                </div>

<div className="more_book">
                <div className="block-heading">
                <h2>Other Books You’ll Love</h2>
                <div className="horizontal_book_list">
                {moreLikeThis.map((books)=>(
                    <Card key={books._id} id={books._id} img={books.img_url} title={books.book_title} author={books.author_name} setLoading={setLoading}/>
                ))}
            </div>
        </div>
        </div>
                <Footer/>

                
            </div>

            </>
        )
    } else {
        return(
            <>
            <BookPageTitleBar/>
            <div className="msg">
            <h3 className="load_msg">Hold tight, a new adventure is on the way!</h3>
            <h4 className="load_msg">Connecting to the server, this may take a while.<br/> If the issue presist please reload the page.</h4>
            </div>
            <Footer />
            </>
        )
    }
    
}

export default BookDetail;