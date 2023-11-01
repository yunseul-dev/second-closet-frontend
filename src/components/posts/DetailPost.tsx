import styled from 'styled-components';
import { LiaHomeSolid, LiaAngleRightSolid, LiaHeartSolid } from 'react-icons/lia';
import { AiFillAlert, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { LuClock3 } from 'react-icons/lu';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Category } from '../../constants/Category';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atom/userState';
import { useParams, Link } from 'react-router-dom';

type Product = {
  productId: number;
  userId: string;
  productName: string;
  imgs: string[];
  categories: string[];
  count: number;
  price: string;
  discount: boolean;
  delivery: boolean;
  description: string;
  tags: string[];
  exchange: boolean;
  size: string;
  facetoface: boolean;
  createdAt: number;
  hearts: string[];
};

const DetailPost = () => {
  const userName = useRecoilValue(userState);
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [imgNum, setImgNum] = useState(0);
  const [clickHeart, setClickHeart] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [clickHeart]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/products/related');
        setItems(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  const {
    productId,
    userId,
    productName,
    imgs,
    categories,
    count,
    price,
    discount,
    delivery,
    description,
    tags,
    exchange,
    size,
    facetoface,
    createdAt,
    hearts,
  }: Product = product;

  const handleHeartClick = () => {
    if (userName === null) return;

    const updatedHearts = hearts.includes(userName) ? hearts.filter(id => id !== userName) : [...hearts, userName];
    axios.patch(`/api/products/hearts/${productId}`, updatedHearts);
    setClickHeart(!clickHeart);
  };

  let time = '';

  const lastTime = (Date.now() - createdAt) / 1000 / 60 / 60; // 시

  if (Math.floor(lastTime) > 24) {
    time = `${Math.floor(lastTime / 24)}일 전`; // 날짜
  } else if (Math.floor(lastTime) > 0) {
    time = `${Math.floor(lastTime)}시간 전`; //
  } else if (lastTime * 60 > 0) {
    time = `${Math.floor(lastTime * 60)}분 전`;
  }

  const handlePrevClick = () => {
    if (imgNum > 0) {
      setImgNum(imgNum - 1);
    } else {
      setImgNum(imgs.length - 1);
    }
  };

  const handleNextClick = () => {
    if (imgNum < imgs.length - 1) {
      setImgNum(imgNum + 1);
    } else {
      setImgNum(0);
    }
  };

  return (
    <ContainerWrapper>
      <CategoryContainer>
        <LiaHomeSolid />홈
        <LiaAngleRightSolid />
        <Select defaultValue={categories[0]}>
          <option value="">선택</option>
          <option value="여성의류">여성의류</option>
          <option value="남성의류">남성의류</option>
          <option value="가방">가방</option>
          <option value="신발">신발</option>
          <option value="액세서리">액세서리</option>
        </Select>
        <LiaAngleRightSolid />
        <Select defaultValue={categories[1]}>
          <option value="">선택</option>
          {categories[1] &&
            Object.keys(Category[categories[0]]).map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </Select>
        <LiaAngleRightSolid />
        <Select defaultValue={categories[2]}>
          <option value="">선택</option>
          {categories[2] &&
            Object.values(Category[categories[0]][categories[1]]).map((category: string) => {
              return (
                <option key={category} value={category}>
                  {category}
                </option>
              );
            })}
        </Select>
      </CategoryContainer>
      <Container>
        <SubmitConatiner>
          <ImageContainer>
            {<Image src={`http://localhost:5023/api/products/uploads/${imgs[imgNum]}`} alt="Image Preview" />}
            <PrevBtn onClick={handlePrevClick}>
              <FaAngleLeft />
            </PrevBtn>
            <NextBtn onClick={handleNextClick}>
              <FaAngleRight />
            </NextBtn>
          </ImageContainer>
          <InfoWrapper>
            <InfoContainer>
              <ProductName>{productName}</ProductName>
              <ProductPrice>
                {price}
                <Span>원</Span>
              </ProductPrice>
              <Alarms>
                <Alarm>
                  <LiaHeartSolid /> {hearts.length}
                </Alarm>
                <Alarm>
                  <LuClock3 /> {time}
                </Alarm>
                <Alarm>
                  <AiFillAlert /> 신고하기
                </Alarm>
              </Alarms>
              <Infos>
                <List>
                  <InfoName>배송옵션 </InfoName>
                  <Info>{delivery ? '무료배송' : '배송비 별도'}</Info>
                </List>
                <List>
                  <InfoName>상품상태 </InfoName>
                  <Info>{count}</Info>
                </List>
                <List>
                  <InfoName>사이즈 </InfoName>
                  <Info>{size.toUpperCase()}</Info>
                </List>
                <List>
                  <InfoName>교환여부 </InfoName>
                  <Info>{exchange ? '교환가능' : '교환불가'}</Info>
                </List>
                <List>
                  <InfoName>가격제안 </InfoName>
                  <Info>{discount ? '가격제안 가능' : '가격제안 불가'}</Info>
                </List>
                <List>
                  <InfoName>직거래 </InfoName>
                  <Info>{facetoface ? '직거래가능' : '직거래불가'}</Info>
                </List>
              </Infos>
            </InfoContainer>
            <Buttons>
              <HeartBtn onClick={handleHeartClick}>
                {userName && hearts.includes(userName) ? <AiFillHeart /> : <AiOutlineHeart />}
              </HeartBtn>
              <TalkBtn>문의하기</TalkBtn>
              <BuyBtn>구매하기</BuyBtn>
            </Buttons>
          </InfoWrapper>
        </SubmitConatiner>
        <ExplainContainer>
          <MiniTitle>
            판매자 <SellerName>{userId}</SellerName> 님의 코멘트
          </MiniTitle>
          <Explain>
            {description}
            <Tags>
              {tags.map(tag => {
                return <Tag key={tag}>#{tag}</Tag>;
              })}
            </Tags>
          </Explain>
        </ExplainContainer>
      </Container>
      <Bottom>
        <MiniTitle>연관 상품</MiniTitle>
        <Recs>
          {items.map(({ productId, productName, imgs }) => (
            <Rec key={productId}>
              <Link to={`/detail/${productId}`}>
                <RecImg>
                  <Img src={`http://localhost:5023/api/products/uploads/${imgs[0]}`} />
                </RecImg>
                <RecName>{productName}</RecName>
              </Link>
            </Rec>
          ))}
        </Recs>
      </Bottom>
    </ContainerWrapper>
  );
};
export default DetailPost;

const ProductName = styled.div`
  font-size: 24px;
  font-weight: 600;
  padding-bottom: 10px;
`;

const ProductPrice = styled.div`
  font-size: 38px;
  font-weight: 500;
`;

const Span = styled.span`
  font-size: 28px;
  font-weight: 400;
  margin-left: 5px;
`;

const ContainerWrapper = styled.div``;

const Container = styled.div``;

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
  gap: 20px;
`;

const ImageContainer = styled.div`
  width: 35%;
  height: 45vh;
  min-width: 420px;
  min-height: 428px;
  border: solid 1px #dbd9d9;
  position: relative;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Control = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
  z-index: 99;
  font-size: 2rem;
`;

const PrevBtn = styled(Control)`
  left: 0;
`;

const NextBtn = styled(Control)`
  right: 0;
`;

const Alarms = styled.div`
  border-top: 1px solid #d0d0d0;
  font-size: 16px;
  margin: 20px 0 0 0;
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
`;

const Alarm = styled.div`
  color: #a8a7a7;
  margin: 0 10px 0 10px;
`;

const InfoWrapper = styled.div`
  width: 60%;
  min-width: 420px;
  min-height: 428px;
`;

const InfoContainer = styled.div`
  width: 100%;
  min-height: 350px;
  padding: 0 30px 0 30px;
`;

const Infos = styled.div`
  padding-top: 20px;
`;

const List = styled.div`
  display: flex;
  font-size: 14px;
  margin: 10px 0 10px 0;
`;

const InfoName = styled.div`
  width: 15%;
  min-width: 120px;
  color: #898989;
`;

const Info = styled.div``;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  position: relative;
  bottom: 0;
  justify-content: flex-end;
`;

const TalkBtn = styled.button`
  width: 25%;
  height: 8vh;
  border: solid 1px black;
  font-weight: 700;
  font-size: 18px;
  background-color: white;
`;

const BuyBtn = styled.button`
  width: 25%;
  height: 8vh;
  border: solid 1px #fd7272;
  font-weight: 700;
  font-size: 18px;
  background-color: #f98181;
  color: white;
`;

const HeartBtn = styled.button`
  width: 10%;
  height: 8vh;
  border: solid 1px black;
  font-weight: 700;
  font-size: 18px;
  background-color: white;
`;

const ExplainContainer = styled.div`
  margin: 30px 0 0 0;
  padding: 20px;
  border-top: 1px solid #d0d0d0;
`;

const Explain = styled.div`
  font-size: 18px;
`;

const SellerName = styled.span``;

const Tags = styled.div`
  margin: 40px 0 20px 0;
`;

const Tag = styled.span`
  padding: 8px;
  color: #8f8f8f;
  margin-right: 5px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
`;

const Bottom = styled.div`
  margin-top: 20px;
  padding: 10px;
  font-size: 20px;
  border-top: 1px solid black;
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
  /* border: 1px solid gray; */
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border: 1px solid gray;
`;

const RecName = styled.div`
  padding: 2px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const MiniTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin: 20px 0 20px 0;
`;
