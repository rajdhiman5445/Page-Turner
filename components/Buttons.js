import { useUser, SignInButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Buttons = ({ text, thisBookId, url, token }) => {
    // Get user authentication state from Clerk
    const { isLoaded, isSignedIn, user } = useUser();

    function readingBook() {
        // Skip the function if user is not signed in
        if (!isSignedIn || !user) return;
        
        // If user is signed in, proceed with saving the book
        const userId = user.id;
        const storageKey = `continue_${userId}`; // User-specific storage key
        
        // Initialize empty array if the storage doesn't exist yet
        if(localStorage.getItem(storageKey) == null){
            localStorage.setItem(storageKey, '[]');
        }

        // Get existing books for this user
        let old_books = JSON.parse(localStorage.getItem(storageKey));
        
        // Remove this book if it already exists (to avoid duplicates)
        old_books = old_books.filter(item => item !== thisBookId);

        // Add this book to the beginning of the array
        old_books.unshift(thisBookId);

        // Save the updated list back to local storage with the user-specific key
        localStorage.setItem(storageKey, JSON.stringify(old_books));
    }

    // Render different components based on authentication status
    if (isSignedIn) {
        // User is signed in - provide the link and button
        return (
            <Link to={`/readbook/${url}${token}`}>
                <button 
                    className="download_btn" 
                    onClick={readingBook}
                >
                    {text}
                </button>
            </Link>
        );
    } else {
        // User is not signed in - only show sign-in button (no link)
        return (
            <SignInButton mode="modal">
                <button className="download_btn">
                    {text}
                </button>
            </SignInButton>
        );
    }
}

export default Buttons;