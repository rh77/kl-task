import React from "react";
import "./Search.scss";

const Search = (): JSX.Element => {
    return (
        <div className="search">
          <label className="search__label">Search:</label>
          <input className="search__input" type="search" placeholder="text" />
        </div>);
  };

export default Search;
