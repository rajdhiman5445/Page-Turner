import genres from "../data/genres";
import genresData from "../data/GenresData";
import { Link } from "react-router-dom";
import GenreCard from "./GenreCard";
import { useState, useEffect } from "react";

const Categories = () => {
    
    return(
        <>
        <div className="genre">

        <h1>Genres and Categories</h1>
        {/* 
        <div className="genre-list">
         <h2 className="genre-item">{genres.map((genre, index) => <span key={index}><Link to={`/result/${genre}`}>{genre + "  "}<br/></Link></span>)}</h2>
         </div>
        */} 
        <div className="genreData">
            {genresData.map((item)=>(
                <GenreCard key={item.id} img={item.img} genre={item.genre}/>
            )
            )}
        </div>

        </div>
        
        </>
    )
}

export default Categories;