import BookPageTitleBar from "./BookPageTitleBar";
import Quote from "./Quote";
import { useState } from "react";

const QuotesPage = () => {

    const [clicked, setClicked] = useState(false)


    return(
        <div onClick={()=>{
            setClicked(val => !val);
        }} style={{width:"100%",height:"100vh"}}>
            <BookPageTitleBar/>
            <div className="quote_container" >
            <div className="quotes-page" >
            <Quote/>
            <div className="space" > </div>
            </div>
            
            </div>
        </div>
        
    )
}

export default QuotesPage;