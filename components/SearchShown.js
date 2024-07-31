import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BookPageTitleBar from "./BookPageTitleBar";
import axios from "axios";
import Card from "./Card";
import server_url from "../data/url";

const SearchShown =() => {

    const params = useParams();
    

    const [booksInfo, setBooksInfo] = useState([]);
    const [searchText, setSearchText] = useState(params.text);

    const filterData = booksInfo.filter((res) => res.book_title.toLowerCase().includes(searchText.toLowerCase()) || res.author_name.toLowerCase().includes(searchText.toLowerCase()) || res.genres.some(genre => genre.toLowerCase().includes(searchText.toLowerCase()))) ;
              

    console.log(searchText);

    useEffect(() => {
        axios.get(server_url)
            .then(response => {
                setBooksInfo(response.data); // Access response.data
            })
            .catch(err => console.log(err));
    }, []);

    return(
        <>
        <BookPageTitleBar/>
        <div className="result-heading">
            <h1 className="result-title">Books in : {searchText}</h1>
            <div className="all_book_list">
                {filterData.map((books)=>(
                    <Card key={books._id} id={books._id} img={books.img_url} title={books.book_title} author={books.author_name} />
                ))}
            </div>
            <div className="space"></div>
        </div>
        
        </>
    )
}

export default SearchShown;
