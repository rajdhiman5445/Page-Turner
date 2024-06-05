import BookPageTitleBar from "./BookPageTitleBar";
import Quote from "./Quote";
import { useState, useEffect} from "react";

const QuotesPage = () => {

    const [clicked, setClicked] = useState(false)


    return(
        <div >
            <BookPageTitleBar/>
            <div className="quote_container" >
            <div className="quotes-page" onClick={()=>{
            setClicked(val => !val);
        }}>
            <Quote/>
            <div className="space" > </div>
            </div>
            
            </div>
        </div>
        
    )
}

export default QuotesPage;