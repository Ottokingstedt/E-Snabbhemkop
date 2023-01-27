import {useState} from 'react'
import { MagnifyingGlassIcon} from '@heroicons/react/24/solid'
import {url, setHeaders} from "../features/api";
import styled from "styled-components";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = async (searchTerm) => {
        try {
            const res = await axios.get(`${url}/products/search?q=${searchTerm}`, setHeaders());
            navigate({
                pathname: '/searchresults',
                state: { searchResults: res.data }
            })
        } catch (error) {
            console.error(error);
        }
    }
  return (
    <form  className="input-group" onSubmit={handleSearch}>
    <input 
    type="text" 
    className='form-control py-2 '
    placeholder="Search Product Here..."
    aria-label="Search Product Here..."
    value={searchTerm}
    onChange={e => setSearchTerm(e.target.value)}
    />
    <SearchButton className='input-group-text p-4' id='basic-addon2' onClick={() => handleSearch(searchTerm)}>
    <MagnifyingGlassIcon className='MagnifyingGlassIcon text-white fs-6' />
    </SearchButton>
</form>  
)
}

export default Search

const SearchButton = styled.button`
  border: none;
  border: none;
outline: none;
background: none;
`