import { useState, useRef, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import styled from 'styled-components';
import { AiOutlineSearch } from '../../../utils/icons';
import { useNavigate } from 'react-router-dom';
import { searchProduct } from '../../../api/products';

const Search = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const searchRef = useRef<HTMLFormElement>(null);

  const navigate = useNavigate();

  const fetchSearchResults = useCallback(
    debounce((term: string) => {
      if (term === '') {
        setSearchResults(['']);
      } else {
        searchProduct(term)
          .then(response => {
            setSearchResults(response.data);
          })
          .catch(error => {
            console.error('Error fetching data: ', error);
            setSearchResults([]);
          });
      }
    }, 300),
    [],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    fetchSearchResults(e.target.value);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
      setSearchResults([]);
      setSearchTerm('');
    }
  };

  const handleCloseClick = () => {
    setSearchResults([]);
    setSearchTerm('');
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleInputKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Enter') return;

    navigate(`/tag/${searchTerm}`);
    setSearchResults([]);
    setSearchTerm('');
  };

  return (
    <>
      <SearchBar ref={searchRef}>
        <Input
          type="text"
          value={searchTerm}
          onKeyDown={handleInputKeyDown}
          onChange={handleInputChange}
          placeholder="상품명을 입력하세요."
        />
        <SearchIcon />
        {searchTerm.length > 0 && (
          <SearchResultsWrapper>
            <SearchResults>
              {searchResults.map((result, index) => (
                <SearchResultItem key={index} onClick={() => navigate(`/tag/${result}`)}>
                  {result}
                </SearchResultItem>
              ))}
            </SearchResults>
            <CloseBtn onClick={handleCloseClick}>닫기</CloseBtn>
          </SearchResultsWrapper>
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

const SearchResultsWrapper = styled.div`
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
  max-height: 350px;
  z-index: 999999;
`;

const SearchResults = styled.div`
  max-height: 300px;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: block;
    width: 13px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d1d0d0;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #a5a5a5;
  }
`;

const SearchResultItem = styled.div`
  padding: 5px;
  font-size: 14px;
  font-weight: 400;
  color: #ff4d24;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const CloseBtn = styled.button`
  height: 30px;
  background-color: transparent;
  position: relative;
  margin-left: 90%;
`;
