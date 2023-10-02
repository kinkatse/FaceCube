import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Search.css';

const Search = () => {
    const [showSearchIcon, setSearchIcon] = useState(false)
    
    const submitHandler = (e) => {
        e.preventDefault();
    }

    const focusHandler = () => {
        if (showSearchIcon) return;
        const input = document.getElementsByClassName('search-input')[0]
        input.classList.add("expand-search")
        setSearchIcon(true);
    };
    const unfocusHandler = (e) => {
        if (e.target.classList[0] === "search-input") return;
        const input = document.getElementsByClassName('search-input')[0]
        input.classList.remove("expand-search")
        setSearchIcon(false);
    };
    
    useEffect(() => {
        if (!showSearchIcon) return;
        // Listening for any click on the page, so then it invokes the close Menu function
        document.addEventListener('click', unfocusHandler);
    
        return () => {
          document.removeEventListener("click", unfocusHandler);
        }
    }, [showSearchIcon]);

    return (
        <form onSubmit={submitHandler} className='search-form'>
          {showSearchIcon && <i className="fa-solid fa-magnifying-glass inside-search"/>}
          <input type="text" placeholder="Search" className='search-input' onFocus={focusHandler}/>
          <button className='search-button'>
            <i className="fa-solid fa-magnifying-glass"/>
          </button>
        </form>
    )
}

export default Search;