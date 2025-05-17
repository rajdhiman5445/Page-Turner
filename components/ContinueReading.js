import Card from "./Card";
import Card2 from "./Card2";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import server_url from "../data/url";
import Shimmer from "./Shimmer";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const ContinueReading = () => {
    const [booksInfo, setBooksInfo] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [scrollVisible, setScrollVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { isLoaded, isSignedIn, user } = useUser();

    const scrollRef = useRef(null);

    // Fetch all books data from API
    useEffect(() => {
        axios.get(server_url)
            .then(response => {
                setBooksInfo(response.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    }, []);

    // Load continue reading books based on user authentication
    useEffect(() => {
        if (!isLoaded || !booksInfo.length) return;

        let continueBooks = [];
        
        if (isSignedIn && user) {
            // User is signed in, get their specific reading list
            const storageKey = `continue_${user.id}`;
            const storedBooks = localStorage.getItem(storageKey);
            
            if (storedBooks) {
                continueBooks = JSON.parse(storedBooks);
            }
        } else {
            // User is not signed in, return empty list
            continueBooks = [];
        }
        
        // Filter books based on the continue reading IDs and maintain their order
        const filtered = booksInfo.filter(book => 
            continueBooks.includes(book._id))
            .sort((a, b) => 
                continueBooks.indexOf(a._id) - continueBooks.indexOf(b._id)
            );
            
        setFilteredBooks(filtered);
    }, [booksInfo, isLoaded, isSignedIn, user]);

    const onScroll = (offset) => {
        scrollRef.current.scrollLeft += offset;
    }

    // Loading state
    if (isLoading || !isLoaded) {
        return <Shimmer />;
    }

    // User not signed in
    if (!isSignedIn) {
        return (
            <div className="block-heading">
                <div className="heading">
                    <h2>Continue Reading</h2>
                </div>
                <div className="sign-in-message">
                    <p>Please sign in to see your reading list</p>
                </div>
            </div>
        );
    }

    // User has no books in continue reading
    if (filteredBooks.length === 0) {
        return (
            <div className="block-heading">
                <div className="heading">
                    <h2>Pick Up From Where You Left</h2>
                </div>
                <div className="empty-list-message">
                    <p>You haven't started reading any books yet</p>
                </div>
            </div>
        );
    }

    // User has books in continue reading
    return (
        <>
            <div 
                className="block-heading" 
                onMouseEnter={() => {setScrollVisible(true)}} 
                onMouseLeave={() => {setScrollVisible(false)}}
            >
                <div className="heading">
                    <h2>Pick Up From Where You Left</h2>
                    {scrollVisible ? 
                        <div className="scroll-btn">
                            <div className="scroll" onClick={() => onScroll(-100)}>
                                <ArrowLeftIcon />
                            </div>
                            <div className="scroll" onClick={() => onScroll(100)}>
                                <ArrowRightIcon/>
                            </div>
                        </div> : null  
                    }
                </div>
                <div className="horizontal_book_list" ref={scrollRef}>
                    {filteredBooks.map((books) => (
                        <Card 
                            key={books._id} 
                            id={books._id} 
                            img={books.img_url} 
                            title={books.book_title} 
                            author={books.author_name} 
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default ContinueReading;