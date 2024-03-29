import styled from 'styled-components';
import { sizes, shoesSizes, wearCounts } from '../../../constants';
import { useProductForm } from '../../../hooks';
import { List, CategoryTab, OptionRadio, Tags, Buttons, Price, ImgFiles } from '../../common/PostInput';

const Contents = () => {
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
    setDiscount,
    tags,
    setTags,
    inputValue,
    setInputValue,
    canFace,
    setCanFace,
    categories,
    setCategories,
    handleSubmit,
    handleImsiSubmit,
  } = useProductForm();

  return (
    <>
      <Lists>
        <List name={'상품명'} must={true}>
          <Input type="text" ref={productNameRef} aria-label="상품명" maxLength={40} />
        </List>
        <List name={'상품 이미지'} must={true} extraChildren={<ImgCount>({imgPrevUrls.length}/11)</ImgCount>}>
          <ImgFiles imgPrevUrls={imgPrevUrls} handleFileChange={handleFileChange} handleDeleteFile={handleDeleteFile} />
        </List>
        <List name={'카테고리'} must={true}>
          <CategoryTab categories={categories} setCategories={setCategories} />
        </List>
        <List name="착용횟수" must={true}>
          <Select ref={countRef} aria-label="착용횟수">
            <option value="" label="선택">
              선택
            </option>
            {wearCounts.map(count => (
              <option value={count} key={count}>
                {count}
              </option>
            ))}
          </Select>
        </List>
        <List name="가격" must={true}>
          <Price setDiscount={setDiscount} price={price} setPrice={setPrice} />
        </List>
        <List name="배송비 포함" must={true}>
          <OptionRadio name="delivery" state={delivery} setState={setDelivery} />
        </List>
        <List name="교환" must={true}>
          <OptionRadio name="exchange" state={exchangeOption} setState={setExchangeOption} />
        </List>
        <List name="직거래" must>
          <OptionRadio name="facetoface" state={canFace} setState={setCanFace} />
        </List>
        <List name="사이즈" must>
          {categories[0] === '신발' ? (
            <Select ref={sizeRef} aria-label="신발 사이즈">
              <option value="" label="선택">
                선택
              </option>
              {shoesSizes.map(size => (
                <option value={size.toLowerCase()} key={size} label={size} />
              ))}
            </Select>
          ) : (
            <Select ref={sizeRef} aria-label="사이즈">
              <option value="">선택</option>
              {sizes.map(size => (
                <option value={size.toLowerCase()} key={size} label={size} />
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
          <Tags tags={tags} setTags={setTags} inputValue={inputValue} setInputValue={setInputValue} />
        </List>
      </Lists>
      <Buttons handleSubmit={handleSubmit} handleImsiSubmit={handleImsiSubmit} cancle="임시저장" submit="등록하기" />
    </>
  );
};

export default Contents;

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
