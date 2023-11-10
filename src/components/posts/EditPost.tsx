import styled from 'styled-components';
import { useState, useRef, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import { LiaAngleRightSolid } from 'react-icons/lia';
import { FaXmark } from 'react-icons/fa6';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Category } from '../../constants/Category';
import { useParams } from 'react-router-dom';
import useProductQuery from '../../hooks/queries/useProductQuery';

interface PostData {
  userId: string | null;
  productName: string;
  imgs: string[];
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
  prevImgs: string[];
}

type DivProps = {
  selected: boolean;
};

type ImgProps = {
  idx: number;
};

const EditPost = () => {
  const navigate = useNavigate();

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
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [imgPrevUrls, setImgPrevUrls] = useState<string[]>([]);
  const [canFace, setCanFace] = useState<boolean>(true);
  const [categories, setCategories] = useState<string[]>([]);

  const [prevImgs, setPrevImgs] = useState<string[]>([]);

  const { id } = useParams();

  const { productInfo } = useProductQuery(id, {});

  useEffect(() => {
    setPrice(productInfo?.price);
    setExchangeOption(productInfo?.exchange);
    setDelivery(productInfo?.delivery);
    setDiscount(productInfo?.discount);
    setTags(productInfo?.tags);
    setCategories(productInfo?.categories);
    setCanFace(productInfo?.facetoface);
    setPrevImgs(productInfo?.imgs);
  }, [productInfo]);

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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (photoFiles.length === 11) return;

    const file = e.target.files && e.target.files[0];

    if (file) {
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
      const fileExtension = file.name.split('.').pop()?.toLocaleLowerCase() || '';
      const isImageFile = allowedExtensions.includes(fileExtension);

      if (isImageFile) {
        setPhotoFiles([...photoFiles, file]);

        const reader = new FileReader();
        reader.onload = () => {
          setImgPrevUrls([...imgPrevUrls, reader.result as string]);
        };
        reader.readAsDataURL(file);
      } else {
        console.log('선택한 파일은 사진 파일이 아닙니다.');
      }
    }
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

  const handleImsiSubmit = () => {
    navigate('/mypage');
  };

  const handleTagXClick = (Xtag: string) => setTags(tags.filter(tag => tag !== Xtag));

  const handleImgXClick = (idx: number) => {
    const updatedImgPrevUrls = [...imgPrevUrls];
    updatedImgPrevUrls.splice(idx, 1);
    setImgPrevUrls(updatedImgPrevUrls);

    const updatedPhotoFiles = [...photoFiles];
    updatedPhotoFiles.splice(idx, 1);
    setPhotoFiles(updatedPhotoFiles);
  };

  const handlePrevImgXClick = (idx: number) => {
    const updatedPrevImgs = [...prevImgs];
    updatedPrevImgs.splice(idx, 1);
    setPrevImgs(updatedPrevImgs);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      if (photoFiles) {
        photoFiles.map(file => {
          formData.append('photo', file);
        });
      }

      const updatedData: Partial<PostData> = {};

      if (productNameRef.current?.value !== productInfo?.productName) {
        updatedData.productName = productNameRef.current?.value;
      }

      if (countRef.current?.value !== productInfo?.count) {
        updatedData.count = countRef.current?.value;
      }

      if (categories !== productInfo?.categories) {
        updatedData.categories = categories;
      }

      if (price !== productInfo?.price) {
        updatedData.price = price;
      }

      if (discount !== productInfo?.discount) {
        updatedData.discount = discount;
      }

      if (delivery !== productInfo?.delivery) {
        updatedData.delivery = delivery;
      }

      if (exchangeOption !== productInfo?.exchange) {
        updatedData.exchange = exchangeOption;
      }

      if (commentRef.current?.value !== productInfo?.description) {
        updatedData.description = commentRef.current?.value;
      }

      if (tags !== productInfo?.tags) {
        updatedData.tags = tags;
      }

      if (sizeRef.current?.value !== productInfo?.size) {
        updatedData.size = sizeRef.current?.value;
      }

      if (canFace !== productInfo?.facetoface) {
        updatedData.facetoface = canFace;
      }

      if (prevImgs !== productInfo.imgs) {
        updatedData.prevImgs = prevImgs;
      }

      formData.append('data', JSON.stringify(updatedData));

      if (
        productNameRef.current?.value &&
        (imgPrevUrls.length || prevImgs.length) &&
        categories.length &&
        sizeRef.current?.value &&
        countRef.current?.value
      ) {
        await axios.patch(`/api/products/edit/${id}`, formData, {
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

  return (
    <Container>
      <TitleContainer>
        <Title>기본 정보</Title>
        <MiniTitle>*필수 정보</MiniTitle>
      </TitleContainer>
      <Lists>
        <List>
          <Name>
            상품명
            <Must>*</Must>
          </Name>
          <Input type="text" ref={productNameRef} defaultValue={productInfo?.productName} />
        </List>
        <List>
          <Name>
            상품 이미지
            <ImgCount>({imgPrevUrls.length}/11)</ImgCount>
            <Must>*</Must>
          </Name>
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
                      <FaXmark onClick={() => handleImgXClick(idx)} />
                    </XImg>
                  </ImagePreview>
                );
              })}{' '}
            {prevImgs &&
              prevImgs.map((prevImg, idx) => {
                return (
                  <ImagePreview idx={idx + 1} key={idx}>
                    <Image src={`http://localhost:5023/api/products/uploads/${prevImg}`} alt="Image Preview" />
                    <XImg>
                      <FaXmark onClick={() => handlePrevImgXClick(idx)} />
                    </XImg>
                  </ImagePreview>
                );
              })}
          </ImgFileContainer>
        </List>
        <List>
          <Name>
            카테고리
            <Must>*</Must>
          </Name>
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
        <List>
          <Name>
            착용횟수
            <Must>*</Must>
          </Name>
          <Select ref={countRef} defaultValue={productInfo?.count}>
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
          <Name>
            가격
            <Must>*</Must>
          </Name>
          <PriceContainer>
            <Price type="text" placeholder="가격을 입력해주세요." value={price} onChange={handleChange} />원
            <PriceSuggestion>
              <input type="checkbox" onChange={e => setDiscount(e.target.checked)} />
              가격 제안받기
            </PriceSuggestion>
          </PriceContainer>
        </List>
        <List>
          <Name>
            배송비 포함
            <Must>*</Must>
          </Name>
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
        <List>
          <Name>
            교환
            <Must>*</Must>
          </Name>
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
        <List>
          <Name>
            직거래
            <Must>*</Must>
          </Name>
          <label>
            <input type="radio" value="true" name="facetoface" checked={canFace} onChange={() => setCanFace(true)} />{' '}
            가능
          </label>
          <label>
            <input type="radio" value="false" name="facetoface" checked={!canFace} onChange={() => setCanFace(false)} />{' '}
            불가능
          </label>
        </List>
        <List>
          <Name>
            사이즈
            <Must>*</Must>
          </Name>
          {categories[0] === '신발' ? (
            <Select ref={sizeRef} defaultValue={productInfo?.size}>
              <option value="">선택</option>
              <option value="225">225</option>
              <option value="230">230</option>
              <option value="235">235</option>
              <option value="240">240</option>
              <option value="245">245</option>
              <option value="250">250</option>
              <option value="255">255</option>
              <option value="260">260</option>
              <option value="265">265</option>
              <option value="270">270</option>
              <option value="275">275</option>
              <option value="280">280</option>
              <option value="285">285</option>
              <option value="290">290</option>
              <option value="Free">Free</option>
            </Select>
          ) : (
            <Select ref={sizeRef} defaultValue={productInfo?.size}>
              <option value="">선택</option>
              <option value="xs">XS</option>
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
              <option value="xl">XL</option>
              <option value="free">FREE</option>
            </Select>
          )}
        </List>
        <List>
          <Name>판매자 코멘트</Name>
          <TextArea
            name="inform"
            id=""
            rows={10}
            ref={commentRef}
            defaultValue={productInfo?.description}
            placeholder="구매시기,브랜드/모델명, 제품의 상태(사용감, 하자 유무) 등 상세한 정보를 입력해 주세요."
          />
        </List>
        <List>
          <Name>태그</Name>
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
      <ButtonContainer>
        <ImsiBtn onClick={() => handleImsiSubmit()}>취소하기</ImsiBtn>
        <SubmitBtn onClick={() => handleSubmit()}>수정하기</SubmitBtn>
      </ButtonContainer>
    </Container>
  );
};

export default EditPost;

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

const List = styled.div`
  display: flex;
  font-size: 16px;
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

const Name = styled.div`
  font-size: 18px;
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

const SubmitBtn = styled.button`
  width: 15%;
  height: 55px;
  font-size: 20px;
  font-weight: 600;
  background-color: #fc7b7b;
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

const Must = styled.span`
  font-size: 20px;
  color: red;
`;
