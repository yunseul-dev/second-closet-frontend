import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import { AiOutlineSearch } from '../../../utils/icons';

const Search = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const searchRef = useRef<HTMLFormElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term === '') {
      setSearchResults(['']);
    } else {
      const results = ['글로니', '글로니', '글로니', '글로니']; // axios 요청으로 받은 결과
      setSearchResults(results);
    }
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
      setSearchResults([]);
      setSearchTerm('');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <>
      <SearchBar ref={searchRef}>
        <Input type="text" value={searchTerm} onChange={handleSearch} placeholder="상품명을 입력하세요." />
        <SearchIcon />
        {searchResults.length > 0 && (
          <SearchResults>
            {searchResults.map((result, index) => (
              <SearchResultItem key={index}>{result}</SearchResultItem>
            ))}
          </SearchResults>
        )}
      </SearchBar>
    </>
  );
};

export default Search;

const SearchBar = styled.form`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  input[type='text']::placeholder {
    color: #ff4d24;
  }
`;

const Input = styled.input`
  width: 85%;
  height: 85%;
  border: 2px solid #ff4d24;
  border-radius: 10px;
  padding-left: 15px;
`;

const SearchIcon = styled(AiOutlineSearch)`
  position: absolute;
  right: 9%;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: #ff4d24;
`;

const SearchResults = styled.div`
  margin-left: 7.5%;
  position: absolute;
  padding-left: 15px;
  top: 100%;
  left: 0;
  width: 85%;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  margin-top: 5px;
  background-color: #fff;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const SearchResultItem = styled.div`
  padding: 5px;
  font-size: 14px;
  font-weight: 400;
  color: #ff4d24;
  margin-top: 10px;
  margin-bottom: 10px;
`;
