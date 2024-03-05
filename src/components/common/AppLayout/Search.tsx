import { useState, useRef, useEffect, useCallback, KeyboardEvent, ChangeEvent } from 'react';
import { debounce } from 'lodash';
import styled from 'styled-components';
import { AiOutlineSearch } from '../../../utils/icons';
import { useNavigate } from 'react-router-dom';
import { searchProduct } from '../../../api/products';

const Search = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const searchRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const debouncedSearch = useCallback(
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isNavigating) {
      setIsNavigating(false);
    } else {
      const value = e.target.value;
      setSearchTerm(value);
      debouncedSearch(value);
      setActiveIndex(-1);
    }
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      navigate(`/tag?searchTerm=${searchTerm}`);
      setSearchResults([]);
      setSearchTerm('');
      setActiveIndex(-1);
    } else if (e.key === 'ArrowDown') {
      setIsNavigating(true);
      setActiveIndex(prevActiveIndex => {
        const nextActiveIndex = prevActiveIndex + 1 < searchResults.length ? prevActiveIndex + 1 : prevActiveIndex;
        setSearchTerm(searchResults[nextActiveIndex]);
        return nextActiveIndex;
      });
    } else if (e.key === 'ArrowUp') {
      setIsNavigating(true);
      setActiveIndex(prevActiveIndex => {
        const nextActiveIndex = prevActiveIndex >= 1 ? prevActiveIndex - 1 : 0;
        setSearchTerm(searchResults[nextActiveIndex]);
        return prevActiveIndex >= 1 ? prevActiveIndex - 1 : -1;
      });
      setTimeout(() => {
        const input = e.target as HTMLInputElement;
        input.setSelectionRange(input.value.length, input.value.length);
      }, 0);
    }
  };

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
      setSearchResults([]);
      setSearchTerm('');
    }
  }, []);

  const handleCloseClick = () => {
    setSearchResults([]);
    setSearchTerm('');
  };

  const handleResultClick = (result: string) => {
    navigate(`/tag?searchTerm=${result}`);
    setSearchResults([]);
    setSearchTerm('');
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [handleOutsideClick]);

  const hasSearchResults = searchResults.length > 0;

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
              {hasSearchResults ? (
                searchResults.map((result, index) => (
                  <SearchResultItem
                    $searchResult={true}
                    $focus={activeIndex === index}
                    key={index}
                    onClick={() => handleResultClick(result)}>
                    {result}
                  </SearchResultItem>
                ))
              ) : (
                <SearchResultItem $searchResult={false} $focus={false}>
                  "{searchTerm}"에 대한 검색 결과가 존재하지 않습니다.
                </SearchResultItem>
              )}
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

const SearchResultItem = styled.div<{ $searchResult: boolean; $focus: boolean }>`
  padding: 10px;
  font-size: 14px;
  font-weight: ${props => (props.$focus ? 700 : 500)};
  background-color: ${props => props.$focus && '#ededed'};
  color: ${props => !props.$searchResult && ' #ff4d24'};
  cursor: ${props => props.$searchResult && 'pointer'};
`;

const CloseBtn = styled.button`
  height: 30px;
  background-color: transparent;
  position: relative;
  margin-left: 90%;
`;
