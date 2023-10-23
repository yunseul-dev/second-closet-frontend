import styled from 'styled-components';
import { LiaHomeSolid, LiaAngleRightSolid } from 'react-icons/lia';

const DetailPost = () => {
  return (
    <Container>
      <CategoryContainer>
        <LiaHomeSolid />홈
        <LiaAngleRightSolid />
        <Select>
          <option value="">선택</option>
          <option value="여성의류">여성의류</option>
          <option value="여성의류">남성의류</option>
          <option value="여성의류">가방</option>
          <option value="여성의류">신발</option>
          <option value="여성의류">액세서리</option>
        </Select>
        <LiaAngleRightSolid />
        <Select>
          <option value="">선택</option>
          <option value="아우터">아우터</option>
          <option value="상의">상의</option>
          <option value="바지">바지</option>
          <option value="치마">치마</option>
          <option value="원피스">원피스</option>
          <option value="점프수트">점프수트</option>
        </Select>
        <LiaAngleRightSolid />
        <Select>
          <option value="">선택</option>
          <option value="아우터">아우터</option>
          <option value="상의">상의</option>
          <option value="바지">바지</option>
          <option value="치마">치마</option>
          <option value="원피스">원피스</option>
          <option value="점프수트">점프수트</option>
        </Select>
      </CategoryContainer>
      <SubmitConatiner>
        <ImageContainer> 사진 </ImageContainer>
        <InfoWrapper>
          <InfoContainer>
            <h5>글로니 </h5>
            <h4>92000원 </h4>
            <Info>카테고리: 여성의류 </Info>
            <Info>배송비: 배송비포함</Info>
            <Info>상품상태: 2회 착용 </Info>
            <Info>교환여부: 교환불가능 </Info>
          </InfoContainer>
          <Buttons>
            <TalkBtn>문의하기</TalkBtn>
            <BuyBtn>구매하기</BuyBtn>
            <HeartBtn>♡ 찜</HeartBtn>
          </Buttons>
        </InfoWrapper>
      </SubmitConatiner>
      <ExplainContainer>
        <h3>판매자 코멘트</h3>
        <Explain>깨끗이 착용했습니다. 저보다 더 잘 입으실 수 있으신 분이 입으시면 좋겠어요 ! </Explain>
      </ExplainContainer>
    </Container>
  );
};
export default DetailPost;

const Container = styled.div`
  padding: 10px;
`;

const CategoryContainer = styled.div`
  border-bottom: 1px solid #767676;
  padding: 10px 0 10px 0;
  font-size: small;
  color: #908d8d;
  display: flex;
  gap: 5px;
  align-items: center;
`;

const Select = styled.select``;

const SubmitConatiner = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ImageContainer = styled.div`
  width: 30%;
  height: 45vh;
  border: solid 1px gray;
  padding: 20px;
`;

const InfoWrapper = styled.div`
  width: 65%;
`;

const InfoContainer = styled.div`
  width: 100%;
  height: 35vh;
  /* border: solid 1px gray; */
  padding: 30px;
`;

const Info = styled.div`
  font-size: 18px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
`;

const TalkBtn = styled.button`
  width: 25%;
  height: 8vh;
  border: solid 1px #ecd167;
  font-weight: 700;
  font-size: 16px;
  background-color: #f1dc89;
`;

const BuyBtn = styled.button`
  width: 25%;
  height: 8vh;
  border: solid 1px #f4768d;
  font-weight: 700;
  font-size: 16px;
  background-color: #f1899c;
`;

const HeartBtn = styled.button`
  width: 15%;
  height: 8vh;
  border: solid 1px #69b0ef;
  font-weight: 700;
  font-size: 16px;
  background-color: #86c0f2;
`;

const ExplainContainer = styled.div`
  margin: 30px 0 20px 0;
  font-size: 18px;
`;

const Explain = styled.div`
  margin: 10px;
`;
