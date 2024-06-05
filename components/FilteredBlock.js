import Card from "./Card";
import axios from "axios";
import { useEffect, useState } from "react";
import server_url from "../data/url";

const FilteredBlock =({list})=>{

    const [booksInfo, setBooksInfo] = useState([]);

    useEffect(() => {
        axios.get(server_url)
            .then(response => {
                setBooksInfo(response.data); // Access response.data
            })
            .catch(err => console.log(err));
    }, []);

    
    const FilteredBook = booksInfo.filter(book  => book.list===list);

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

export default FilteredBlock;