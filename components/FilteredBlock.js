import Card from "./Card";
import axios from "axios";
import { useEffect, useState } from "react";
import server_url from "../data/url";
import Shimmer from "./Shimmer";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useRef } from "react";

const FilteredBlock =({list})=>{

    const [booksInfo, setBooksInfo] = useState([]);
    const [scrollVisible, setScrollVisible] = useState(false);

    const scrollRef = useRef(null);

    useEffect(() => {
        axios.get(server_url)
            .then(response => {
                setBooksInfo(response.data); 
            })
            .catch(err => console.log(err));
    }, []);



    const FilteredBook2 = booksInfo.filter(book =>
        book.list.some(l => l === list) 
      );

    const FilteredBook = FilteredBook2.sort((a,b) => a.book_title.localeCompare(b.book_title));

    const onScroll = (offset) => {
        scrollRef.current.scrollLeft += offset;
    }

    if (FilteredBook.length === 0){
        return(
            <Shimmer/>
        )
    }
    else{
        return(
            <>
            <div className="block-heading" onMouseEnter={()=>{setScrollVisible(true)}} onMouseLeave={()=>{setScrollVisible(false)}}>
            <div className="heading">
            <h2>{list}</h2>
            {scrollVisible ? 
                <div className="scroll-btn">
                <div className="scroll" onClick={() => onScroll(-100)}><ArrowLeftIcon /></div>
                <div className="scroll" onClick={() => onScroll(100)}><ArrowRightIcon/></div>
            </div>  : null  
            }
            </div>
                <div className="horizontal_book_list" ref={scrollRef} >
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