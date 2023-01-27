import {useState} from "react";
import { useLocation} from 'react-router-dom'
import { useEffect } from 'react';


const SearchResults = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (location.state && location.state.searchResults) {
      setSearchResults(location.state.searchResults);
    }
  }, [location.state]);

  return (
    <div>
      {searchResults.map((result) => (
        <div key={result.id}>
          {result.name}
        </div>
      ))}
    </div>
  );
};

export default SearchResults