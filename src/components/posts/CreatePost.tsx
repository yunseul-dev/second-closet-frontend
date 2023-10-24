import styled from 'styled-components';
import { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import { FaAngleRight } from 'react-icons/fa6';
import axios from 'axios';
import { userState } from '../../recoil/atom/userState';
import { useRecoilValue } from 'recoil';

interface PostData {
  userId: string | null;
  productName: string;
  img: string;
  categories: string[];
  count: string;
  price: string;
  discount: boolean;
  delivery: string;
  exchange: string;
  description: string;
  tags: string[];
  size: string;
}

type DivProps = {
  selected: boolean;
};

const CreatePost = () => {
  const userId = useRecoilValue(userState);
  const productNameRef = useRef<HTMLInputElement>(null);
  const countRef = useRef<HTMLSelectElement>(null);
  const sizeRef = useRef<HTMLSelectElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const [value, setValue] = useState('');
  const [exchangeOption, setExchangeOption] = useState('impossible');
  const [delivery, setDelivery] = useState('included');
  const [discount, setDiscount] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const [categories, setCategories] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numValue = parseInt(e.target.value.replace(/,/g, ''), 10);
    if (!isNaN(numValue)) {
      setValue(numValue.toLocaleString());
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue && !tags.includes(inputValue) && tags.length < 5) {
        setTags([...tags, inputValue]);
        setInputValue('');
      }
    }
  };

  const handleFirstCategoryClick = (category: string) => setCategories([category]);

  const handleSecondCategoryClick = (category: string) => setCategories([categories[0], category]);

  const handleThirdCategoryClick = (category: string) => setCategories([categories[0], categories[1], category]);

  const handleSubmit = async (data: PostData) => {
    try {
      data = {
        userId: userId,
        productName: productNameRef.current ? productNameRef.current.value : '',
        img: '3',
        categories: categories,
        count: countRef.current ? countRef.current.value : '',
        price: value,
        discount: discount,
        delivery: delivery,
        exchange: exchangeOption,
        description: commentRef.current ? commentRef.current.value : '',
        tags: tags,
        size: sizeRef.current ? sizeRef.current.value : '',
      };
      await axios.post('api/products/post', data);
    } catch (error) {
      console.log('data: ', data);
      console.log(error);
    }
  };

  const firstCategory = ['여성의류', '남성의류', '가방', '신발', '액세서리'];
  const secondCategory = ['아우터', '상의', '바지', '치마', '원피스', '점프수트', '홈웨어'];
  const thirdCategory = ['패딩', '점퍼', '코트', '자켓', '가디건', '조끼/베스트'];

  return (
    <Container>
      <TitleContainer>
        <Title>기본 정보</Title>
        <MiniTitle>*필수 정보</MiniTitle>
      </TitleContainer>
      <Lists>
        <List>
          <Name>상품명</Name>
          <Input type="text" ref={productNameRef} />
        </List>
        <List>
          <Name>상품 이미지</Name>
          <FileLabel htmlFor="file-upload">
            <div>
              <AiOutlineCamera />
            </div>
            <div>이미지 등록</div>
          </FileLabel>
          <InputFile id="file-upload" type="file" />
        </List>
        <List>
          <Name>카테고리</Name>
          <CategoryTop>
            <CategoryContainer>
              <CategoryBox>
                {firstCategory.map(category => {
                  return (
                    <CategoryItem
                      key={category}
                      selected={category === categories[0]}
                      onClick={() => handleFirstCategoryClick(category)}>
                      {category}
                    </CategoryItem>
                  );
                })}
              </CategoryBox>
              <CategoryBox>
                {secondCategory.map(category => {
                  return (
                    <CategoryItem
                      key={category}
                      selected={category === categories[1]}
                      onClick={() => handleSecondCategoryClick(category)}>
                      {category}
                    </CategoryItem>
                  );
                })}
              </CategoryBox>
              <CategoryBox>
                {thirdCategory.map(category => {
                  return (
                    <CategoryItem
                      key={category}
                      selected={category === categories[2]}
                      onClick={() => handleThirdCategoryClick(category)}>
                      {category}
                    </CategoryItem>
                  );
                })}
              </CategoryBox>
            </CategoryContainer>
            <div>
              선택한 카테고리:{' '}
              {categories.map((category, idx) => {
                return (
                  <span key={category}>
                    {category}
                    {idx < categories.length - 1 && <FaAngleRight />}
                  </span>
                );
              })}
            </div>
          </CategoryTop>
        </List>
        <List>
          <Name>착용횟수</Name>
          <Select ref={countRef}>
            <option value="">선택</option>
            <option value="새상품">새상품</option>
            <option value="1회">1회</option>
            <option value="2회">2회</option>
            <option value="3회">3회</option>
            <option value="4회">4회</option>
            <option value="5회 이상">5회 이상</option>
          </Select>
        </List>
        <List>
          <Name>가격</Name>
          <PriceContainer>
            <Price type="text" placeholder="가격을 입력해주세요." value={value} onChange={handleChange} />원
            <PriceSuggestion>
              <input type="checkbox" onChange={e => setDiscount(e.target.checked)} />
              가격 제안받기
            </PriceSuggestion>
          </PriceContainer>
        </List>
        <List>
          <Name>배송비 포함</Name>
          <label>
            <input
              type="radio"
              value="included"
              name="delivery"
              checked={delivery === 'included'}
              onChange={e => setDelivery(e.target.value)}
            />{' '}
            배송비포함
          </label>
          <label>
            <input
              type="radio"
              value="notIncluded"
              name="delivery"
              checked={delivery === 'notIncluded'}
              onChange={e => setDelivery(e.target.value)}
            />{' '}
            배송비별도
          </label>
        </List>
        <List>
          <Name>교환</Name>
          <label>
            <input
              type="radio"
              value="impossible"
              name="exchange"
              checked={exchangeOption === 'impossible'}
              onChange={e => setExchangeOption(e.target.value)}
            />{' '}
            불가
          </label>
          <label>
            <input
              type="radio"
              value="possible"
              name="exchange"
              checked={exchangeOption === 'possible'}
              onChange={e => setExchangeOption(e.target.value)}
            />{' '}
            가능
          </label>
        </List>
        <List>
          <Name>사이즈</Name>
          <Select ref={sizeRef}>
            <option value="">선택</option>
            <option value="xs">XS</option>
            <option value="s">S</option>
            <option value="m">M</option>
            <option value="l">L</option>
            <option value="xl">XL</option>
            <option value="free">FREE</option>
          </Select>
        </List>
        <List>
          <Name>판매자 코멘트</Name>
          <TextArea
            name="inform"
            id=""
            rows={12}
            ref={commentRef}
            placeholder="구매시기, 브랜드/모델명, 제품의 상태(사용감, 하자유무), 색상 등을 입력해 주세요."
          />
        </List>
        <List>
          <Name>태그</Name>
          <TagWrapper>
            {tags.map(tag => {
              return <Tag key={tag}>{`#${tag}`}</Tag>;
            })}
            <StyledInput
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeydown}
              placeholder="태그를 입력해주세요. (최대 5개)"
            />
          </TagWrapper>
        </List>
      </Lists>
      <ButtonContainer>
        <ImsiBtn>임시저장</ImsiBtn>
        <SubmitBtn onClick={handleSubmit}>등록하기</SubmitBtn>
      </ButtonContainer>
    </Container>
  );
};

export default CreatePost;

const Container = styled.div`
  margin-bottom: 20px;
  padding: 10px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0 20px 0;
  border-bottom: 2px solid black;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 600;
`;

const MiniTitle = styled.div`
  font-size: medium;
  color: red;
`;

const FileLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 200px;
  height: 200px;
  background-color: #f0f0f0;
  border: 1px solid gray;
`;

const InputFile = styled.input`
  display: none;
`;

const Lists = styled.div`
  padding: 10px;
`;

const List = styled.div`
  display: flex;
  font-size: 20px;
  margin: 30px 0 30px 0;
`;

const CategoryTop = styled.div`
  width: 80%;
`;

const CategoryContainer = styled.div`
  width: 100%;
  display: flex;
`;

const CategoryBox = styled.div`
  width: 33%;
  height: 30vh;
  border: 1px solid black;
  padding: 10px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: block;
    width: 13px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #b8b8b8;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #8b8b8b;
  }
`;

const CategoryItem = styled.div<DivProps>`
  padding: 10px;
  height: 45px;
  background-color: ${({ selected }) => selected && '#fad4db'};
  font-weight: ${({ selected }) => selected && '600'};
  text-align: center;
  border-radius: 10px;
`;

const Select = styled.select``;

const Name = styled.div`
  font-size: 24px;
  width: 20%;
  min-width: 192px;
`;

const Input = styled.input`
  width: 80%;
  font-size: 16px;
  height: 40px;
`;

const TextArea = styled.textarea`
  width: 80%;
`;
const PriceContainer = styled.div`
  width: 70%;
`;

const Price = styled.input`
  width: 30%;
  height: 40px;
  font-weight: 600;
`;

const PriceSuggestion = styled.div`
  font-size: 15px;
  padding: 10px 0 10px 0;
`;

const ButtonContainer = styled.div`
  position: sticky;
  background-color: white;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  border-top: 1px solid #d4d4d4;
  padding-top: 20px;
`;

const TagWrapper = styled.div`
  display: flex;
  width: 80%;
  min-height: 38px;
  padding: 5px;
  border: 1px solid gray;
  align-items: center;
`;

const Tag = styled.div`
  margin: 5px;
  background-color: #f1899c;
  color: white;
  padding: 5px;
  border-radius: 10px;
  font-size: 14px;

  white-space: nowrap;
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  width: 80%;
  font-size: 16px;
  height: 40px;
`;

const SubmitBtn = styled.button`
  width: 15%;
  height: 55px;
  font-size: 20px;
  font-weight: 600;
  background-color: #f1899c;
  color: white;
`;

const ImsiBtn = styled.button`
  width: 15%;
  height: 55px;
  border: 1px solid gray;
  font-size: 20px;
  font-weight: 600;
  background-color: white;
`;
