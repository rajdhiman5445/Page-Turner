import ReactDOM from "react-dom/client"
import React from "react"
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
import HeroPage from "./components/HeroPage"
import { ClerkProvider } from '@clerk/clerk-react'
import { dark } from '@clerk/themes'

// Import your Publishable Key
const PUBLISHABLE_KEY = process.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const bookAppTheme = {
   baseTheme: "dark",
  elements: {
    // Card container for auth forms
    card: {
      backgroundColor: "#1a1a1a",
      borderRadius: "8px",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
      border: "1px solid #333",
      fontFamily: "League Spartan",
    },
    
    // Primary buttons (sign in, continue, etc)
    formButtonPrimary: {
      backgroundColor: "#d06832", // Gold/bronze color from your logo
      color: "#111",
      fontWeight: "600",
      borderRadius: "4px",
      "&:hover": {
        backgroundColor: "#d8bc89",
      },
    },
    
    // Secondary buttons
    formButtonReset: {
      color: "#d06832",
      "&:hover": {
        color: "#d8bc89",
      },
    },
    
    // Header title in auth forms
    headerTitle: {
      color: "#d06832",
      fontFamily: "League Spartan",
      fontSize: "24px",
    },
    
    // Header subtitle
    headerSubtitle: {
      color: "#aaa",
    },
    
    // User profile button
    userButtonBox: {
      borderRadius: "50%",
      border: "2px solid transparent",
      transition: "all 0.2s ease",
      "&:hover": {
        borderColor: "#d06832",
      },
    },
    
    // User button avatar
    userButtonAvatarBox: {
      width: "36px",
      height: "36px",
    },
    
    // Input fields
    formFieldInput: {
      backgroundColor: "#222",
      borderColor: "#444",
      color: "#fff",
      "&:focus": {
        borderColor: "#d06832",
        boxShadow: "0 0 0 2px rgba(196, 168, 117, 0.2)",
      },
    },
    
    // Input labels
    formFieldLabel: {
      color: "#d06832",
    },
    
    // Social buttons
    socialButtonsProviderIcon__google: {
      filter: "brightness(2)",
    },
    
    // Links in the auth forms
    footerActionLink: {
      color: "#d06832",
      fontWeight: "500",
      "&:hover": {
        textDecoration: "underline",
        color: "#d8bc89",
      },
    },
    
    // Divider text
    dividerText: {
      color: "#aaa",
    },
    
    // Alert success
    alertText__success: {
      color: "#8ce7b2",
    },
    
    // Alert error
    alertText__error: {
      color: "#e78c8c",
    },
  },
  layout: {
    showOptionalFields: true,
    socialButtonsVariant: "iconButton",
    socialButtonsPlacement: "bottom",
    logoPlacement: "inside",
    logoImageUrl: "", // You can add your Page & Turner logo URL here
  },
};



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
                path:"/home",
                element:<Body/>,
            },
            {
                path:"/categories",
                element:<Categories/>
            },
            {
                path:"/library",
                element:<AllBooks/>
            },
            
            
            
        ],
        errorElement:<Error/>,
    },
    {
        path:"/highlights",
        element:<HeroPage/>,
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
//root.render(<RouterProvider router={appRouter}/>)

root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/" appearance={{baseTheme: [dark, bookAppTheme], variables: { fontFamily: "League Spartan" },}}>
      <RouterProvider router={appRouter} />
    </ClerkProvider>
  </React.StrictMode>
);