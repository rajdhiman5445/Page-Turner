import search from "../files/types/search.svg"
import highlights from "../files/types/highlights.svg"
import genres from "../files/types/genres.svg"
import quote from "../files/types/quotes.svg"
import books from "../files/types/books.svg"

const types = [
    {id: 1, link: "/search", img: search, title:"Search for books"},
    {id:2, link: "/categories", img: genres, title:"Explore all Genres"},
    {id:3, link: "/books", img: books, title:"Explore Featured Books"},
    {id:4, link:"/home", img: highlights, title:"Get Highlights"},
    {id:5, link:"/quotes", img: quote, title:"Explore Quotes"}
]

export default types;