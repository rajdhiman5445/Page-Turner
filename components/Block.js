import Card from "./Card";
import axios from "axios";
import { useEffect, useState } from "react";
import server_url from "../data/url";
import Shimmer from "./Shimmer";

const Block =({list})=>{

    const [booksInfo, setBooksInfo] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [long, setLong] = useState(false);

    useEffect(() => {
        axios.get(server_url)
            .then(response => {
                setBooksInfo(response.data); 
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setLong(true);
        }, 10000);
    },[])

    const FilteredBook2 = booksInfo.filter(book =>
        book.list.some(l => l === list) 
      );


    const FilteredBook = FilteredBook2.sort((a,b) => a.book_title.localeCompare(b.book_title))
    

    let text = "Why is it taking too long?"
    if (!showMore) {
        text = "Why is it taking too long?"}
    else{
        text = "Ok, take your time!"
    }
    

    if (FilteredBook.length === 0){
        return(<div>
            
        <div className={long?"connect_msg":"no_msg"}>
            <div>Hold tight, the library of imagination is opening...</div>
        <br/>
        <div className="know_more" onClick={()=>{setShowMore((prev)=>!prev)}}>{text}</div>
        <br/>
        <div className={`${showMore?"show":"no"}`+"_text"}>
        Hi there,
    <p>
      Our servers are currently experiencing high traffic, and it may take up to <b>1 minutes</b> to connect. Please try reloading the page or check back in a few minutes.
    </p>
   <p>Thank you for your patience.</p> 
            </div>
        </div>
        
        <Shimmer/>
        </div>
        )
    }
    else{
    return(
        <>
        <div className="block-heading">
            <h2>{list}</h2>
            <div className="horizontal_book_list">
                {FilteredBook.map((books)=>(
                    <Card key={books._id} id={books._id} img={books.img_url} title={books.book_title} author={books.author_name} />
                ))}
            </div>
        </div>
        </>
        )
    }

    
}

export default Block;