import search from "../files/types/search.svg"
import highlights from "../files/types/highlights.svg"
import genres from "../files/types/genres.svg"
import quote from "../files/types/quotes.svg"
import library from "../files/types/library.svg"

const types = [
    {id: 1, link: "/search", img: search, title:"Search for books"},
    {id:2, link: "/categories", img: genres, title:"Explore all Genres"},
    {id:3, link: "/library", img: library, title:"Explore Library"},
    {id:4, link:"/home", img: highlights, title:"Get Highlights"},
    {id:5, link:"/quotes", img: quote, title:"Explore Quotes"}
]

export default types;