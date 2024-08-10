import { useEffect } from "react";
import useSearch from "../../hooks/useSearch";

const Search = ({ onSearch }) => {
  const { query, handleChange, handleSubmit } = useSearch();

  useEffect(() => {
    onSearch(query);
  }, [query, onSearch]);

  return (
    <div className="mb-3">
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control input-color"
          type="search"
          placeholder="Buscar"
          aria-label="Search"
          value={query}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default Search;
