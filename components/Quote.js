import quote from "../data/quotes";

const Quote = () => {
    const text = quote[(Math.floor(Math.random()*quote.length))];
    return(
        <div>
            <div>
            <p className="quote_text">{text}</p>
            </div>
        </div>
    )
}

export default Quote;