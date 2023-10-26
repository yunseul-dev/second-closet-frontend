import styled from 'styled-components';
import { LiaHomeSolid, LiaAngleRightSolid } from 'react-icons/lia';

const DetailPost = () => {
  return (
    <ContainerWrapper>
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
      <Container>
        <SubmitConatiner>
          <ImageContainer>
            <Image src={'./assets/image/party.png'} alt="Image Preview" />
          </ImageContainer>
          <InfoWrapper>
            <InfoContainer>
              <ProductName>글로니 트위드 스커트 GLOWNY U BABY TWEED SKIRT</ProductName>
              <ProductPrice>
                92,000<Span>원</Span>
              </ProductPrice>
              <Infos>
                <List>
                  <InfoName>배송옵션 </InfoName>
                  <Info>무료배송</Info>
                </List>
                <List>
                  <InfoName>상품상태 </InfoName>
                  <Info>새상품</Info>
                </List>
                <List>
                  <InfoName>사이즈 </InfoName>
                  <Info>S</Info>
                </List>
                <List>
                  <InfoName>교환여부 </InfoName>
                  <Info>가능</Info>
                </List>
                <List>
                  <InfoName>카테고리 </InfoName>
                  <Info>스커트</Info>
                </List>
              </Infos>
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
          <Explain>
            깨끗이 착용했습니다. 저보다 더 잘 입으실 수 있으신 분이 입으시면 좋겠어요 !
            <Tags>
              {' '}
              <Tag>#글로니</Tag>
              <Tag>#글로니스커트</Tag>
            </Tags>
          </Explain>
        </ExplainContainer>
      </Container>
      <Bottom>
        <h3>추천 상품</h3>
        <Recs>
          <Rec>
            <RecImg>사진</RecImg>
            <RecName>제목</RecName>
          </Rec>
          <Rec>
            <RecImg>사진</RecImg>
            <RecName>제목</RecName>
          </Rec>
          <Rec>
            <RecImg>사진</RecImg>
            <RecName>제목</RecName>
          </Rec>
          <Rec>
            <RecImg>사진</RecImg>
            <RecName>제목</RecName>
          </Rec>
          <Rec>
            <RecImg>사진</RecImg>
            <RecName>제목</RecName>
          </Rec>
        </Recs>
      </Bottom>
    </ContainerWrapper>
  );
};
export default DetailPost;

const ProductName = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

const ProductPrice = styled.div`
  font-size: 40px;
  font-weight: 500;
`;

const Span = styled.span`
  font-size: 28px;
  font-weight: 400;
  margin-left: 5px;
`;

const Tags = styled.div`
  margin: 20px 0 20px 0;
`;

const Tag = styled.span`
  padding: 10px;
  color: #f77a8f;
  background-color: white;
  margin-right: 5px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 16px;
`;

const Bottom = styled.div`
  border-top: 1px solid black;
  padding: 20px;
  font-size: 20px;
`;

const Recs = styled.div`
  display: flex;
`;
const Rec = styled.div`
  width: 20%;
  height: 20vh;
  padding: 10px;
`;

const RecImg = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid gray;
`;

const RecName = styled.div`
  padding: 2px;
  font-size: 18px;
`;

const ContainerWrapper = styled.div`
  padding: 10px;
`;

const Container = styled.div`
  padding: 20px;
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

const Select = styled.select`
  width: 150px;
  height: 25px;
  border-color: #bbb7b7;
`;

const SubmitConatiner = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ImageContainer = styled.div`
  width: 35%;
  height: 45vh;
  border: solid 1px #dbd9d9;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoWrapper = styled.div`
  width: 60%;
`;

const InfoContainer = styled.div`
  width: 100%;
  height: 35vh;
  padding: 0 30px 0 30px;
`;

const Infos = styled.div`
  margin: 20px 0 10px 0;
  border-top: 1px solid #d0d0d0;
  padding-top: 20px;
`;

const List = styled.div`
  display: flex;
  font-size: 16px;
  margin: 10px 0 10px 0;
`;

const InfoName = styled.div`
  width: 15%;
  color: #898989;
`;

const Info = styled.div``;

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
  font-size: 20px;
  padding: 20px;
  /* border-top: 1px solid #d0d0d0; */
  border-radius: 20px;
  border: 5px solid #fad4db;
  background-color: #fad4db;
`;

const Explain = styled.div`
  margin: 10px;
  /* border-top: 1px solid #d0d0d0; */
  padding-top: 10px;
`;
