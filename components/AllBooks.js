import Card from "./Card";
import axios from "axios";
import { useEffect, useState } from "react";
import server_url from "../data/url";
import Shimmer from "./Shimmer";

const AllBooks =()=>{

    const [booksInfo, setBooksInfo] = useState([]);

    useEffect(() => {
        axios.get(server_url)
            .then(response => {
                setBooksInfo(response.data); // Access response.data
            })
            .catch(err => console.log(err));
    }, []);
    const length = booksInfo.length;

    const booksInfo2 = booksInfo.sort((a,b) => a.book_title.localeCompare(b.book_title));

    if (booksInfo.length === 0){
        return(
        <Shimmer/>
        )
    }
    else{
    return(
        <>
        <div className="app_body">
           <h2 className="all_books">Library</h2>
           <div className="connect_msg">Currently {length} books are available <br/> 
           We are trying hard to add more books</div>
            <div className="all_book_list">
                {booksInfo2.map((books)=>(
                    <Card key={books._id} id={books._id} img={books.img_url} title={books.book_title} author={books.author_name} />
                ))}
            </div>
        </div>
        </>
        )
    }

    
}

export default AllBooks;