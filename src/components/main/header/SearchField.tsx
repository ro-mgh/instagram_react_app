import React, { useState } from "react";

const SearchField = () => {
  const [search, setSearch] = useState("");

  //   const handleChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
  //     console.log(event.target.value);
  //     setSearch(event.target.value);
  //   };

  return (
    <div className="header-search-placeholder">
      <input
        className="header-search-input"
        type="text"
        autoCapitalize="none"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      ></input>
      {/* <div className="header-search-button" role="button" tabIndex={0}>
        <div className="header-search-div">
          <span className="header-search-spanLogo"></span>
          <span className="header-search-spanText">Search</span>
        </div>
      </div> */}
    </div>
  );
};

export default SearchField;
