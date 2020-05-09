import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";

const Header = (props) => {
    const [searchText, setSearchText] = useState("");

    return (
        <div className="header">
            <p>
                <span role="img" aria-label="Keeper icon">
                    📝
                </span>
                Keeper
            </p>
            <div className="search-bar">
                <input
                    name="searchBar"
                    placeholder="Search"
                    onChange={(event) => setSearchText(event.target.value)}
                    value={searchText}
                />
                {searchText ? (
                    <button
                        className="clr-icon"
                        onClick={() => {
                            props.handleSearch("");
                            setSearchText("");
                        }}
                    >
                        +
                    </button>
                ) : null}
                <SearchIcon
                    onClick={() => {
                        props.handleSearch(searchText);
                    }}
                />
            </div>
        </div>
    );
};

export default Header;
