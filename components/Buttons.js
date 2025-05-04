const Buttons = ({text, thisBookId}) => {

    function readingBook() {

        if(localStorage.getItem('continue') == null){
            localStorage.setItem('continue', '[]');
        }
        let old_books = JSON.parse(localStorage.getItem('continue'));
        
        old_books = old_books.filter(item => item !== thisBookId);

        old_books.unshift(thisBookId);

        localStorage.setItem('continue', JSON.stringify(old_books));
    }

    return(
        <>
            <div>
                <button className="download_btn" onClick={readingBook} >{text}</button>
            </div>
        </>
    )
}

export default Buttons;