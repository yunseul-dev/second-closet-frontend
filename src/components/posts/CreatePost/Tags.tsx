import styled from 'styled-components';
import { FaXmark } from 'react-icons/fa6';
import React, { ChangeEvent, KeyboardEvent, Dispatch, SetStateAction } from 'react';

interface TagsProps {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
}

const Tags: React.FC<TagsProps> = ({ tags, setTags, inputValue, setInputValue }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleTagXClick = (Xtag: string) => setTags(tags.filter(tag => tag !== Xtag));

  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (tags.length === 5) return;

      if (inputValue && !tags.includes(inputValue) && tags.length < 5) {
        setTags([...tags, inputValue.replace(/\s/g, '')]);
        setInputValue('');
      }
    }
  };

  return (
    <TagWrapper>
      {tags.map(tag => {
        return (
          <Tag key={tag}>
            {`# ${tag}`}
            <Xtag>
              <FaXmark onClick={() => handleTagXClick(tag)} />
            </Xtag>
          </Tag>
        );
      })}
      <StyledInput
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeydown}
        placeholder="태그를 입력해주세요. (최대 5개)"
      />
    </TagWrapper>
  );
};

export default Tags;

const TagWrapper = styled.div`
  display: flex;
  width: 80%;
  min-height: 38px;
  padding: 5px;
  border: 1px solid gray;
  align-items: center;
`;

const Xtag = styled.div`
  margin-left: 5px;
  cursor: pointer;
  color: white;
  font-size: 12px;
  background-color: #c9c9c9;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const Tag = styled.div`
  margin: 5px;
  background-color: #ededed;
  padding: 5px;
  border-radius: 10px;
  font-size: 16px;
  white-space: nowrap;
  display: flex;
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  width: 80%;
  font-size: 16px;
  height: 40px;
`;
