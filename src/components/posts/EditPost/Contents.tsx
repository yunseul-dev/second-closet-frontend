import { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { FaXmark } from '../../../utils/icons';
import { sizes, shoesSizes, wearCounts } from '../../../constants';
import { useProductQuery } from '../../../hooks/queries';
import { useProductForm } from '../../../hooks';
import { List, CategoryTab, OptionRadio, Tags, Buttons, Price, ImgFiles } from '../../common/PostInput';

type ImgProps = {
  idx: number;
};

const Contents = () => {
  const { id } = useParams();

  const { productInfo } = useProductQuery(id);

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

  const {
    imgPrevUrls,
    handleDeleteFile,
    handleFileChange,
    productNameRef,
    countRef,
    sizeRef,
    commentRef,
    price,
    setPrice,
    exchangeOption,
    setExchangeOption,
    delivery,
    setDelivery,
    discount,
    setDiscount,
    tags,
    setTags,
    inputValue,
    setInputValue,
    canFace,
    setCanFace,
    categories,
    setCategories,
    prevImgs,
    setPrevImgs,
    handleImsiSubmit,
    handleEditSubmit,
  } = useProductForm(productInfo);

  const handlePrevImgXClick = (idx: number) => {
    const updatedPrevImgs = [...prevImgs];
    updatedPrevImgs.splice(idx, 1);
    setPrevImgs(updatedPrevImgs);
  };

  return (
    <>
      <Lists>
        <List name={'상품명'} must={true}>
          <Input type="text" ref={productNameRef} defaultValue={productInfo?.productName} aria-label="상품명" />
        </List>
        <List
          name={'상품 이미지'}
          must={true}
          extraChildren={<ImgCount>({imgPrevUrls.length + prevImgs.length}/11)</ImgCount>}>
          <ImgFiles
            imgPrevUrls={imgPrevUrls}
            handleFileChange={handleFileChange}
            handleDeleteFile={handleDeleteFile}
            extraChildren={
              <>
                {prevImgs &&
                  prevImgs.map((prevImg, idx) => {
                    return (
                      <ImagePreview idx={idx + 1} key={idx}>
                        <Image src={prevImg} alt="Image Preview" />
                        <XImg aria-label="삭제">
                          <FaXmark onClick={() => handlePrevImgXClick(idx)} />
                        </XImg>
                      </ImagePreview>
                    );
                  })}
              </>
            }
          />
        </List>
        <List name={'카테고리'} must={true}>
          <CategoryTab categories={categories} setCategories={setCategories} />
        </List>
        <List name="착용횟수" must={true}>
          <Select ref={countRef} defaultValue={productInfo?.count} aria-label="착용횟수">
            <option value="" label="선택" />
            {wearCounts.map(count => (
              <option value={count} label={count} />
            ))}
          </Select>
        </List>
        <List name="가격" must>
          <Price setDiscount={setDiscount} price={price} setPrice={setPrice} discount={discount} />
        </List>
        <List name="배송비 포함" must={true}>
          <OptionRadio name="delivery" state={delivery} setState={setDelivery} />
        </List>
        <List name="교환" must>
          <OptionRadio name="exchange" state={exchangeOption} setState={setExchangeOption} />
        </List>
        <List name="직거래" must>
          <OptionRadio name="facetoface" state={canFace} setState={setCanFace} />
        </List>
        <List name="사이즈" must>
          {categories[0] === '신발' ? (
            <Select ref={sizeRef} defaultValue={productInfo?.size} aria-label="신발 사이즈">
              <option value="" label="선택" />
              {shoesSizes.map(size => (
                <option value={size.toLowerCase()} label={size} />
              ))}
            </Select>
          ) : (
            <Select ref={sizeRef} defaultValue={productInfo?.size} aria-label="사이즈">
              <option value="" label="선택" />

              {sizes.map(size => (
                <option value={size.toLowerCase()} label={size} />
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
            defaultValue={productInfo?.description}
            placeholder="구매시기,브랜드/모델명, 제품의 상태(사용감, 하자 유무) 등 상세한 정보를 입력해 주세요."
          />
        </List>
        <List name="태그" must={false}>
          <Tags tags={tags} setTags={setTags} inputValue={inputValue} setInputValue={setInputValue} />
        </List>
      </Lists>
      <Buttons
        handleSubmit={() => {
          handleEditSubmit(id);
        }}
        handleImsiSubmit={handleImsiSubmit}
        cancle="취소하기"
        submit="수정하기"
      />
    </>
  );
};

export default Contents;

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

const Lists = styled.div`
  padding: 10px;
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
