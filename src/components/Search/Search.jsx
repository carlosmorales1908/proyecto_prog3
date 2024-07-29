import React, { useState } from 'react';

const Search = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <div className='container mt-4'>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input
                    className="form-control me-2 bg-dark text-light"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={query}
                    onChange={handleChange}
                />
                <button className="btn btn-outline-secondary" type="submit">Search</button>
            </form>
        </div>
    );
};

export default Search;
