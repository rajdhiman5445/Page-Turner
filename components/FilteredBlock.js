import Card from "./Card";
import axios from "axios";
import { useEffect, useState } from "react";
import server_url from "../data/url";
import Shimmer from "./Shimmer";

const FilteredBlock =({list})=>{

    const [booksInfo, setBooksInfo] = useState([]);

    useEffect(() => {
        axios.get(server_url)
            .then(response => {
                setBooksInfo(response.data); // Access response.data
            })
            .catch(err => console.log(err));
    }, []);

    
    //const FilteredBook = booksInfo.filter(book  => book.list===list);

    const FilteredBook2 = booksInfo.filter(book =>
        book.list.some(l => l === list) // Assuming 'list' is the passed value
      );

    const FilteredBook = FilteredBook2.sort((a,b) => a.book_title.localeCompare(b.book_title));

    if (FilteredBook.length === 0){
        return(
            <Shimmer/>
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

export default FilteredBlock;