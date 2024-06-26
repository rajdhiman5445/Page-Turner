import ReactDOM from "react-dom/client"
import NavBar from "./components/NavBar"
import Body from "./components/Body"
import Read from "./components/Read"
import Search from "./components/Search"
import Categories from "./components/Categories"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import BookDetail from "./components/BookDetail"
import SearchShown from "./components/SearchShown"
import Footer from "./components/Footer"
import QuotesPage from "./components/QuotesPage"
import AllBooks from "./components/AllBooks"



const AppComponent =() => {
    return (
        <>
        <div className="nav_bar">
            <NavBar/>
        </div>
        <div className="body">
            <Outlet/>
        </div>
        <div>
            <Footer/>
        </div>
        </>
    )
}


const appRouter = createBrowserRouter([
    {
        path:"/",
        element:<AppComponent/>,
        children:[
            {
                path:"/",
                element:<Body/>,
            },
            {
                path:"/books",
                element:<Body/>,
            },
            {
                path:"/categories",
                element:<Categories/>
            },
            {
                path:"/bookseries",
                element:<AllBooks/>
            },
            
            
            
        ],
        errorElement:<Error/>,
    },
    {
        path:"/bookinfo/:id",
        element:<BookDetail/>,
    },
    {
        path:"/readbook/:url/:token",
        element:<Read/>
    },
    {
        path:"/search",
        element:<Search/>
    },
    {
        path:"/result/:text",
        element:<SearchShown/>
    },
    {
        path:"/quotes",
        element:<QuotesPage/>
    },

    
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>)