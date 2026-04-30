import { useState, useEffect } from 'react';

// Import all SVG images
import Action from "url:../files/Categories/35.svg";
import Adventure from "url:../files/Categories/36.svg";
import NonFiction from "url:../files/Categories/18.svg";
import Thriller from "url:../files/Categories/31.svg";
import Self from "url:../files/Categories/27.svg";
import Fiction from "url:../files/Categories/10.svg";
import Historical from "url:../files/Categories/11.svg";
import Science from "url:../files/Categories/25.svg";
import SciFi from "url:../files/Categories/26.svg";
import Paranormal from "url:../files/Categories/19.svg";
import Suspense from "url:../files/Categories/28.svg";
import Horror from "url:../files/Categories/13.svg";
import Biography from "url:../files/Categories/2.svg";
import Crime from "url:../files/Categories/9.svg";
import Cookbook from "url:../files/Categories/8.svg";
import Mystery from "url:../files/Categories/17.svg";
import History from "url:../files/Categories/12.svg";
import Humor from "url:../files/Categories/14.svg";
import Romance from "url:../files/Categories/24.svg";
import Spirituality from "url:../files/Categories/29.svg";
import Sports from "url:../files/Categories/30.svg";
import Memoir from "url:../files/Categories/15.svg";
import Music from "url:../files/Categories/16.svg";
import Art from "url:../files/Categories/1.svg";
import Short from "url:../files/Categories/34.svg";
import Business from "url:../files/Categories/3.svg";
import Children from "url:../files/Categories/4.svg";
import Classics from "url:../files/Categories/5.svg";
import Comedy from "url:../files/Categories/6.svg";
import Comics from "url:../files/Categories/7.svg";
import Philosophy from "url:../files/Categories/20.svg";
import Poetry from "url:../files/Categories/21.svg";
import Psychology from "url:../files/Categories/22.svg";
import Religion from "url:../files/Categories/23.svg";
import Travel from "url:../files/Categories/32.svg";
import Young from "url:../files/Categories/33.svg";

export default function SearchPage({ searchText }) {
  const [genreImage, setGenreImage] = useState(null);
  
  // Map of genre names to their respective imported images
  const genreImages = {
    "Action": Action,
    "Adventure": Adventure,
    "Non-Fiction": NonFiction,
    "Thriller": Thriller,
    "Self-Help": Self,
    "Fiction": Fiction,
    "Historical Fiction": Historical,
    "Science": Science,
    "Science Fiction": SciFi,
    "Paranormal": Paranormal,
    "Suspense": Suspense,
    "Horror": Horror,
    "Biography": Biography,
    "Crime": Crime,
    "Cookbooks": Cookbook,
    "Mystery": Mystery,
    "History": History,
    "Humor": Humor,
    "Romance": Romance,
    "Spirituality": Spirituality,
    "Sports": Sports,
    "Memoir": Memoir,
    "Music": Music,
    "Art": Art,
    "Short Story": Short,
    "Business": Business,
    "Children's": Children,
    "Classics": Classics,
    "Comedy": Comedy,
    "Comics": Comics,
    "Philosophy": Philosophy,
    "Poetry": Poetry,
    "Psychology": Psychology,
    "Religion": Religion,
    "Travel": Travel,
    "Young Adult": Young
  };
  
  useEffect(() => {
    // Direct match
    if (genreImages[searchText]) {
      setGenreImage(genreImages[searchText]);
      return;
    }
    
    // Case-insensitive match
    const searchLower = searchText.toLowerCase();
    const matchedKey = Object.keys(genreImages).find(
      key => key.toLowerCase() === searchLower
    );
    
    if (matchedKey) {
      setGenreImage(genreImages[matchedKey]);
    } else {
      setGenreImage(null);
    }
  }, [searchText]);
  
  return (
    <div className="search-results-container">
      <div className="genre-header flex flex-col items-center mb-6">
        {genreImage && (
          <img 
            src={genreImage} 
            alt={`${searchText} category`}
            className="genre-icon w-16 h-16 mb-2" 
          />
        )}
        <h1 className="text-2xl font-bold">Books in: {searchText}</h1>
      </div>
      
      {/* Your search results would go here */}
    </div>
  );
}