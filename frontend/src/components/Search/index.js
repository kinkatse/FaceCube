import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Search.css';

const Search = () => {
    const [showSearchIcon, setSearchIcon] = useState(false)
    // const [showSearchBar, setSearchBar] = useState(true)
    
    const submitHandler = (e) => {
        e.preventDefault();
    }

    const focusHandler = () => {
        const input = document.getElementsByClassName('search-input')[0]
        if (showSearchIcon) return;
        input.classList.add("expand-search")
        setSearchIcon(true);
    };
    const unfocusHandler = (e) => {
        if (e.target.classList[0] === "search-input") return;
        const input = document.getElementsByClassName('search-input')[0]
        input.classList.remove("expand-search")
        setSearchIcon(false);
    };

    // const resizeHandler = (e) => {
    //     const input = document.getElementsByClassName('search-input')[0]
    //     if (input.offsetWidth <= 52) {
    //         input.style.visibility = "hidden"
    //         setSearchBar(false)
    //     } else {
    //         input.style.visibility = "visible"
    //         setSearchBar(true)
    //     }
    // }

    let searchButton;
    // if (showSearchBar) {
        searchButton = (
          <button className='search-button'>
            <i className="fa-solid fa-magnifying-glass"/>
          </button>
        )
    // } else {
    //     searchButton = (
    //       <button className='no-bar-search-button'>
    //         <i className="fa-solid fa-magnifying-glass"/>
    //       </button>
    //     )
    // }
    
    // useEffect(() => {
    //     resizeHandler()
    //     window.addEventListener('resize', resizeHandler)

    //     return () => {
    //         window.removeEventListener("resize", resizeHandler);
    //     }
    // }, [])
    
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
          {searchButton}
        </form>
    )
}

export default Search;