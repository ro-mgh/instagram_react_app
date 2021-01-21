import React, { useState } from "react";
import logo from "../../../pictures/instagram_logo.png";
import MenuDropdown from "./MenuDropdown";
import SearchField from "./SearchField";

// src / pictures / instagram_logo.png

const Header = () => {
  const [search, setSearch] = useState("");

  const handleChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div className="header-main">
      <div className="header-main-container">
        <div className="header-logo-placeholder">
          <a href="/" className="header-logo-a">
            <div className="header-logo-div">
              <img src={logo} alt=""></img>
            </div>
          </a>
        </div>
        <SearchField />
        <div className="header-nav-placeholder">
          <div className="header-nav-div">
            <div className="header-nav-icon">
              <a href="/">
                <svg
                  aria-label="Home"
                  className=""
                  fill="#262626"
                  height="22"
                  viewBox="0 0 48 48"
                  width="22"
                >
                  <path d="M45.5 48H30.1c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2.1-4.6-4.6-4.6s-4.6 2.1-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.6-.6 2.1 0l21.5 21.5c.3.3.4.7.4 1.1v23.5c.1.8-.6 1.5-1.4 1.5z"></path>
                </svg>
              </a>
            </div>
            <div className="header-nav-icon">
              <a href="/explore" tabIndex={0}>
                <svg
                  aria-label="Find People"
                  className=""
                  fill="#262626"
                  height="22"
                  viewBox="0 0 48 48"
                  width="22"
                >
                  <path
                    clipRule="evenodd"
                    d="M24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0zm0 45C12.4 45 3 35.6 3 24S12.4 3 24 3s21 9.4 21 21-9.4 21-21 21zm10.2-33.2l-14.8 7c-.3.1-.6.4-.7.7l-7 14.8c-.3.6-.2 1.3.3 1.7.3.3.7.4 1.1.4.2 0 .4 0 .6-.1l14.8-7c.3-.1.6-.4.7-.7l7-14.8c.3-.6.2-1.3-.3-1.7-.4-.5-1.1-.6-1.7-.3zm-7.4 15l-5.5-5.5 10.5-5-5 10.5z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
            <div className="header-nav-icon">
              <MenuDropdown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
