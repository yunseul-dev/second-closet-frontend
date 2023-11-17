import styled from 'styled-components';
import { LiaHeartSolid } from 'react-icons/lia';
import { AiFillAlert, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { LuClock3 } from 'react-icons/lu';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atom/userState';
import { useParams, Link } from 'react-router-dom';
import useAddHeartMutation from '../../hooks/mutations/useAddHeartMutation';
import useDeleteHeartMutation from '../../hooks/mutations/useDeleteMutation';
import useProductQuery from '../../hooks/queries/useProductQuery';
import formatTimeAgo from '../../utils/formatTimeAgo';
import useRelatedQuery from '../../hooks/queries/useRelatedQuery';
import CategoryTab from '../common/CategoryTab';

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

type RelatedItems = {
  productId: number;
  productName: string;
  imgs: string[];
};

interface BtnProps {
  $isHovered: boolean;
}

const DetailPost = () => {
  const userName = useRecoilValue(userState);

  const { id } = useParams();

  const [imgNum, setImgNum] = useState(0);
  const [imgHovered, setImgHovered] = useState(false);
  const { mutate: addHeart } = useAddHeartMutation();
  const { mutate: deleteHeart } = useDeleteHeartMutation();

  const { productInfo } = useProductQuery(id, {});

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
  }: Product = productInfo;

  const relatedItems: RelatedItems = useRelatedQuery(productId, categories[1]);

  if (!productInfo) {
    return <div>Loading...</div>;
  }

  const handleHeartClick = () => {
    if (userName === null) return;

    if (!hearts.includes(userName)) {
      addHeart({ productId: productId, userId: userName, hearts: hearts });
    } else {
      deleteHeart({ productId: productId, userId: userName, hearts: hearts });
    }
  };

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

  const handleMouseEnter = () => {
    setImgHovered(true);
  };

  const handleMouseLeave = () => {
    setImgHovered(false);
  };

  return (
    <ContainerWrapper>
      <CategoryTab categories={categories} />
      <Container>
        <SubmitConatiner>
          <ImageContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {<Image src={`http://localhost:5023/api/products/uploads/${imgs[imgNum]}`} alt="Image Preview" />}
            <PrevBtn onClick={handlePrevClick} $isHovered={imgHovered}>
              <FaAngleLeft />
            </PrevBtn>
            <NextBtn onClick={handleNextClick} $isHovered={imgHovered}>
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
                  <LuClock3 /> {formatTimeAgo(createdAt)}
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
              <TalkBtn disabled={!discount}>문의하기</TalkBtn>
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
          {relatedItems.map(({ productId, productName, imgs }: RelatedItems) => (
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

const ContainerWrapper = styled.div`
  margin-bottom: 30px;
`;

const Container = styled.div``;

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

const Control = styled.button<BtnProps>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ $isHovered }) => ($isHovered ? '#fff' : 'transparent')};
  background-color: ${({ $isHovered }) => ($isHovered ? '#2d2c2c' : 'transparent')};
  border-radius: 50px;
  opacity: 0.2;
  cursor: pointer;
  z-index: 99;
  font-size: 2rem;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 40px;
  height: 40px;
`;

const PrevBtn = styled(Control)`
  left: 10px;
`;

const NextBtn = styled(Control)`
  right: 10px;
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
  &:disabled {
    cursor: default;
    border-color: #1010104d;
  }
`;

const BuyBtn = styled.button`
  width: 25%;
  height: 8vh;
  border: solid 1px #fd7272;
  font-weight: 700;
  font-size: 18px;
  background-color: #ff4d24;
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
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border: 1px solid #dad8d8;
`;

const RecName = styled.div`
  padding: 2px;
  font-size: 16px;
  font-weight: 600;
  color: #636363;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MiniTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin: 20px 0 20px 0;
`;
