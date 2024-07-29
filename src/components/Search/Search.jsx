import React, { useState } from 'react';

const Search = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value); 
    };

    return (
        <div className="mb-3">
            <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
                <input
                    className="form-control me-2 bg-dark text-light"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={query}
                    onChange={handleChange}
                />
            </form>
        </div>
    );
};

export default Search;
