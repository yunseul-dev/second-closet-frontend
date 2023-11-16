import styled from 'styled-components';
import { Category } from '../../../constants/Category';
import { sizes, shoesSizes } from '../../../constants/sizes';
import wearCounts from '../../../constants/wearCounts';
import { AiOutlineCamera } from 'react-icons/ai';
import { LiaAngleRightSolid } from 'react-icons/lia';
import { FaXmark } from 'react-icons/fa6';
import { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import axios from 'axios';
import { userState } from '../../../recoil/atom/userState';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import List from './List';
import Buttons from './Buttons';
import useFileUpload from '../../../hooks/useFileUpload';

type DivProps = {
  selected: boolean;
};

type ImgProps = {
  idx: number;
};

interface PostData {
  userId: string | null;
  productName: string;
  categories: string[];
  count: string;
  price: string;
  discount: boolean;
  delivery: boolean;
  exchange: boolean;
  description: string;
  tags: string[];
  size: string;
  facetoface: boolean;
}

const Contents = () => {
  const navigate = useNavigate();
  const { photoFiles, imgPrevUrls, handleFileChange, handleDeleteFile } = useFileUpload();

  const userId = useRecoilValue(userState);
  const productNameRef = useRef<HTMLInputElement>(null);
  const countRef = useRef<HTMLSelectElement>(null);
  const sizeRef = useRef<HTMLSelectElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const [price, setPrice] = useState('');
  const [exchangeOption, setExchangeOption] = useState<boolean>(false);
  const [delivery, setDelivery] = useState(true);
  const [discount, setDiscount] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [canFace, setCanFace] = useState<boolean>(true);

  const [categories, setCategories] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numValue = parseInt(e.target.value.replace(/,/g, ''), 10);
    if (!isNaN(numValue)) {
      setPrice(numValue.toLocaleString());
    } else {
      setPrice('');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (tags.length === 5) return;

      if (inputValue && !tags.includes(inputValue) && tags.length < 5) {
        setTags([...tags, inputValue]);
        setInputValue('');
      }
    }
  };

  const handleFirstCategoryClick = (category: string) => setCategories([category]);
  const handleSecondCategoryClick = (category: string) => setCategories([categories[0], category]);
  const handleThirdCategoryClick = (category: string) => setCategories([categories[0], categories[1], category]);
  const handleTagXClick = (Xtag: string) => setTags(tags.filter(tag => tag !== Xtag));

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      if (photoFiles) {
        photoFiles.map(file => {
          formData.append('photo', file);
        });
      }

      const data: PostData = {
        userId: userId,
        productName: productNameRef.current ? productNameRef.current.value : '',
        categories: categories,
        count: countRef.current ? countRef.current.value : '',
        price: price,
        discount: discount,
        delivery: delivery,
        exchange: exchangeOption,
        description: commentRef.current ? commentRef.current.value : '',
        tags: tags,
        size: sizeRef.current ? sizeRef.current.value : '',
        facetoface: canFace,
      };

      formData.append('data', JSON.stringify(data));

      if (
        productNameRef.current?.value &&
        imgPrevUrls.length &&
        categories.length &&
        sizeRef.current?.value &&
        countRef.current?.value
      ) {
        await axios.post('/api/products/post', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        navigate('/');
      } else {
        console.log('모든 항목을 입력해주세요');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImsiSubmit = async () => {
    try {
      const formData = new FormData();

      if (photoFiles) {
        photoFiles.map(file => {
          formData.append('photo', file);
        });
      }

      const data: PostData = {
        userId: userId,
        productName: productNameRef.current ? productNameRef.current.value : '',
        categories: categories,
        count: countRef.current ? countRef.current.value : '',
        price: price,
        discount: discount,
        delivery: delivery,
        exchange: exchangeOption,
        description: commentRef.current ? commentRef.current.value : '',
        tags: tags,
        size: sizeRef.current ? sizeRef.current.value : '',
        facetoface: canFace,
      };

      formData.append('data', JSON.stringify(data));

      if (
        productNameRef.current?.value ||
        imgPrevUrls.length ||
        categories.length ||
        sizeRef.current?.value ||
        countRef.current?.value
      ) {
        await axios.post('/api/products/post', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        navigate('/');
      } else {
        console.log('아무것도 등록되지 않음');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Lists>
        <List name={'상품명'} must={true}>
          <Input type="text" ref={productNameRef} />
        </List>
        <List name={'상품 이미지'} must={true} extraChildren={<ImgCount>({imgPrevUrls.length}/11)</ImgCount>}>
          <ImgFileContainer>
            <FileLabel htmlFor="file-upload">
              <div>
                <AiOutlineCamera />
              </div>
              <div>이미지 등록</div>
            </FileLabel>
            <InputFile id="file-upload" type="file" onChange={handleFileChange} />
            {imgPrevUrls &&
              imgPrevUrls.map((imgPrevUrl, idx) => {
                return (
                  <ImagePreview idx={idx + 1} key={idx}>
                    <Image src={imgPrevUrl} alt="Image Preview" />
                    <XImg>
                      <FaXmark onClick={() => handleDeleteFile(idx)} />
                    </XImg>
                  </ImagePreview>
                );
              })}
          </ImgFileContainer>
        </List>
        <List name={'카테고리'} must={true}>
          <CategoryTop>
            <CategoryContainer>
              <CategoryBox>
                {Object.keys(Category).map(category => {
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
                {categories[0] &&
                  Object.keys(Category[categories[0]]).map((category: string) => {
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
                {categories[1] &&
                  Object.values<string>(Category[categories[0]][categories[1]]).map((category: string) => {
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
            <CategoryView>
              <SelectedCategory> 선택한 카테고리: </SelectedCategory>
              {categories.map((category, idx) => {
                return (
                  <span key={category}>
                    {category}
                    {idx < categories.length - 1 && <LiaAngleRightSolid />}
                  </span>
                );
              })}
            </CategoryView>
          </CategoryTop>
        </List>
        <List name="착용횟수" must={true}>
          <Select ref={countRef}>
            <option value="">선택</option>
            {wearCounts.map(count => (
              <option value={count}>{count}</option>
            ))}
          </Select>
        </List>
        <List name="가격" must={true}>
          <PriceContainer>
            <Price type="text" placeholder="가격을 입력해주세요." value={price} onChange={handleChange} />원
            <PriceSuggestion>
              <input type="checkbox" onChange={e => setDiscount(e.target.checked)} />
              가격 제안받기
            </PriceSuggestion>
          </PriceContainer>
        </List>
        <List name="배송비 포함" must={true}>
          <label>
            <input
              type="radio"
              value="included"
              name="delivery"
              checked={delivery}
              onChange={() => setDelivery(true)}
            />{' '}
            배송비포함
          </label>
          <label>
            <input
              type="radio"
              value="notIncluded"
              name="delivery"
              checked={!delivery}
              onChange={() => setDelivery(false)}
            />{' '}
            배송비별도
          </label>
        </List>
        <List name="교환" must={true}>
          <label>
            <input
              type="radio"
              value="false"
              name="exchange"
              checked={!exchangeOption}
              onChange={() => setExchangeOption(false)}
            />{' '}
            불가
          </label>
          <label>
            <input
              type="radio"
              value="true"
              name="exchange"
              checked={exchangeOption}
              onChange={() => setExchangeOption(true)}
            />{' '}
            가능
          </label>
        </List>
        <List name="직거래" must>
          <label>
            <input type="radio" value="true" name="facetoface" checked={canFace} onChange={() => setCanFace(true)} />{' '}
            가능
          </label>
          <label>
            <input type="radio" value="false" name="facetoface" checked={!canFace} onChange={() => setCanFace(false)} />{' '}
            불가능
          </label>
        </List>
        <List name="사이즈" must>
          {categories[0] === '신발' ? (
            <Select ref={sizeRef}>
              <option value="">선택</option>
              {shoesSizes.map(size => (
                <option value={size.toLowerCase()}>{size}</option>
              ))}
            </Select>
          ) : (
            <Select ref={sizeRef}>
              <option value="">선택</option>
              {sizes.map(size => (
                <option value={size.toLowerCase()}>{size}</option>
              ))}
            </Select>
          )}
        </List>
        <List name="판매자 코멘트" must={false}>
          <TextArea
            name="inform"
            id=""
            rows={10}
            ref={commentRef}
            placeholder="구매시기,브랜드/모델명, 제품의 상태(사용감, 하자 유무) 등 상세한 정보를 입력해 주세요."
          />
        </List>
        <List name="태그" must={false}>
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
        </List>
      </Lists>
      <Buttons handleSubmit={handleSubmit} handleImsiSubmit={handleImsiSubmit} />
    </>
  );
};

export default Contents;

const ImgFileContainer = styled.div`
  flex-wrap: wrap;
  display: flex;
  width: 80%;
`;

const FileLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 32%;
  height: 200px;
  background-color: #f0f0f0;
  border: 1px solid gray;
`;

const ImagePreview = styled.div<ImgProps>`
  width: 32%;
  height: 200px;
  margin-bottom: 1%;
  margin-left: ${({ idx }) => idx % 3 && '2%'};
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const XImg = styled.button`
  color: white;
  position: absolute;
  top: 5px;
  right: 6px;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  background-color: rgba(128, 128, 128, 0.5);
  z-index: 99;
  text-align: center;
`;

const ImgCount = styled.span`
  font-size: 18px;
  color: #818181;
`;

const InputFile = styled.input`
  display: none;
`;

const Lists = styled.div`
  padding: 10px;
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
    background-color: #d1d0d0;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #a5a5a5;
  }
`;

const CategoryItem = styled.div<DivProps>`
  padding: 10px;
  height: 45px;
  background-color: ${({ selected }) => selected && '#fee4e4'};
  font-weight: ${({ selected }) => selected && '600'};
  text-align: center;
  border-radius: 10px;
`;

const CategoryView = styled.div`
  margin-top: 10px;
  font-weight: 600;
  color: #f98181;
`;

const SelectedCategory = styled.span`
  font-weight: 500;
  color: #858383;
`;

const Select = styled.select``;

const Input = styled.input`
  width: 80%;
  font-size: 16px;
  height: 40px;
`;

const TextArea = styled.textarea`
  width: 80%;
  font-size: 16px;
`;
const PriceContainer = styled.div`
  width: 70%;
`;

const Price = styled.input`
  width: 30%;
  height: 40px;
  font-size: 16px;
  font-weight: 500;
`;

const PriceSuggestion = styled.div`
  font-size: 14px;
  padding: 10px 0 10px 0;
`;

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
