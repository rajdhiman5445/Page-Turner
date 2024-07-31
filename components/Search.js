import SearchPageBar from "./SearchPageBar";
import { useState , useEffect} from "react";
import axios from "axios";
import Card from "./Card";
import server_url from "../data/url";

const Search = () => {


    const [booksInfo, setBooksInfo] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        axios.get(server_url)
            .then(response => {
                setBooksInfo(response.data); // Access response.data
            })
            .catch(err => console.log(err));
    }, []);


    const handleKeyDown = (event) => {
        if (event.key === 'Enter'){
            if (searchText !== ""){
                const filterData = booksInfo.filter((res) => res.book_title.toLowerCase().includes(searchText.toLowerCase()) || res.author_name.toLowerCase().includes(searchText.toLowerCase()) || res.genres.some(genre => genre.toLowerCase().includes(searchText.toLowerCase()))) ;
                setSearchResult(filterData);
            }
            else{
                setSearchResult([])
            }
            
        }
    }

    useEffect(()=>{
        setSearchResult([])
    }, [])


    return (
        <>
        <SearchPageBar searchText={searchText} setSearchText={setSearchText} booksInfo={booksInfo} setSearchResult={setSearchResult} handleKeyDown={handleKeyDown}/>
        {(searchResult)?(
            
            <div className="block-heading">
            <div style={{padding:"50px"}}></div>
            <div className="all_book_list">
            
                {searchResult.map((books)=>(
                    <Card key={books._id} id={books._id} img={books.img_url} title={books.book_title} author={books.author_name} />
                ))}
            </div>
            
            
        </div>
        ):(<div></div>)}
        </>
    );
};

export default Search;