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
    
    
    // make the api call to fetch data
    useEffect(() => {
        axios.get(server_url)
            .then(response => {
                setBooksInfo(response.data); // Access response.data
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(()=>{
        setThisBookId(params.id)
    }, [params.id]);

    const thisBook = bookInfo.find(book => book._id === thisBookId);
    const moreBook = bookInfo.filter(book => book._id !== thisBookId);



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
                        {/* <h1>{thisBook.author_name}</h1> */}
                        <h1><Link to={`/result/${thisBook.author_name}`}>{thisBook.author_name}</Link></h1>
                    </div>
                    <div className="stars">
                    {/* <Rating name="read-only" defaultValue={Number(thisBook.value)} precision={0.5} readOnly /> */}
                        <h2>{thisBook.year}</h2>
                    </div>
                    <div> 
                        <h2>in {thisBook.genres.map((genre, index) => <span key={index}><Link to={`/result/${genre}`}>{genre + " "}</Link></span>)}</h2>
                    </div>
                    <div className="btn_list">

                        <Link to={`/readbook/`+`${thisBook.url}`+`${thisBook.token}`}><Buttons text="Read Now"/></Link>
                        <Link to={thisBook.epub}><Buttons text="Download Epub"/></Link>
                        <Link to={thisBook.pdf}><Buttons text="Download PDF"/></Link>
                    </div>
                </div>
        
            </div>

            {/* <div ref={ref} className={`${inView?'main_about':'main_about_hidden'}`}> */}
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
                <h2>More Like This</h2>
                <div className="horizontal_book_list">
                {moreBook.map((books)=>(
                    <Card key={books._id} id={books._id} img={books.img_url} title={books.book_title} author={books.author_name}/>
                   
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
            <h5 className="load_msg">Connecting to the server, this may take a while.<br/> If the issue presist please reload the page.</h5>
            <Footer />
            </>
        )
    }
    
}

export default BookDetail;