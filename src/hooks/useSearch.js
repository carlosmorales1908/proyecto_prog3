import { useState, useCallback } from 'react';

function useSearch(initialItems = [], initialQuery = '', filterFn = () => true) {
    const [items, setItems] = useState(initialItems);
    const [query, setQuery] = useState(initialQuery);


    const handleChange = useCallback((event) => {
        setQuery(event.target.value);
    }, []);

    
    const handleSubmit = useCallback((event) => {
        event.preventDefault();
    }, []);

   
    const filteredItems = items.filter(item => filterFn(item, query));

    return {
        query,
        filteredItems,
        handleChange,
        handleSubmit,
        setItems,
    };
}

export default useSearch;
