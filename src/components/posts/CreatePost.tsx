import styled from 'styled-components';
import { useState, ChangeEvent } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';

const CreatePost = () => {
  const [value, setValue] = useState('');
  const [exchangeOption, setExchangeOption] = useState('impossible');
  const [delivery, setDelivery] = useState('included');
  const [discount, setDiscount] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numValue = parseInt(e.target.value.replace(/,/g, ''), 10);
    if (!isNaN(numValue)) {
      setValue(numValue.toLocaleString());
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
          <Input type="text" />
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
                  return <CategoryItem key={category}>{category}</CategoryItem>;
                })}
              </CategoryBox>
              <CategoryBox>
                {secondCategory.map(category => {
                  return <CategoryItem key={category}>{category}</CategoryItem>;
                })}
              </CategoryBox>
              <CategoryBox>
                {thirdCategory.map(category => {
                  return <CategoryItem key={category}>{category}</CategoryItem>;
                })}
              </CategoryBox>
            </CategoryContainer>
            <div>선택한 카테고리: </div>
          </CategoryTop>
        </List>
        <List>
          <Name>착용횟수</Name>
          <Select>
            <option value="">선택</option>
            <option value="원피스">새상품</option>
            <option value="아우터">1회</option>
            <option value="상의">2회</option>
            <option value="바지">3회</option>
            <option value="치마">4회</option>
            <option value="점프수트">5회 이상</option>
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
          <Select>
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
            placeholder="구매시기, 브랜드/모델명, 제품의 상태(사용감, 하자유무), 색상 등을 입력해 주세요."></TextArea>
        </List>
      </Lists>
      <ButtonContainer>
        <ImsiBtn>임시저장</ImsiBtn>
        <SubmitBtn>등록하기</SubmitBtn>
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

const CategoryItem = styled.div`
  padding: 10px;
  height: 40px;
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
