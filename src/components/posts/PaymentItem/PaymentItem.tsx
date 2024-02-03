import styled from 'styled-components';
import ItemCard from '../../common/ItemCard/ItemCard';
import { useUserQuery } from '../../../hooks/queries';
import { List } from '../../common/PostInput';
import { useLocation, useNavigate } from 'react-router-dom';
import { payments } from '../../../constants';

const PaymentItem = () => {
  const locate = useLocation();
  const productInfo = locate.state;
  const navigate = useNavigate();

  const { userInfo } = useUserQuery();

  return (
    <ContainerWrapper>
      <Container>
        <Title>안전하게 결제하기</Title>
        <div>
          <ItemCard productInfo={productInfo} size="big" />
        </div>
        <List name="배송지" must={false}>
          <AddressInput defaultValue={userInfo.address} />
        </List>
        <List name="결제수단" must={false}>
          <Labels>
            {payments.map((val, idx) => {
              return (
                <label key={idx}>
                  <input
                    type="radio"
                    value={idx === 0 ? 'true' : 'false'}
                    name="payment"
                    defaultChecked={idx === 0 && true}
                  />
                  {val}
                </label>
              );
            })}
          </Labels>
        </List>
        <List name="결제금액" must={false}>
          <div>
            <Price>{productInfo.price}</Price> 원
          </div>
        </List>
        <BuyBtn onClick={() => navigate('/')}>결제하기</BuyBtn>
      </Container>
    </ContainerWrapper>
  );
};

export default PaymentItem;

const ContainerWrapper = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 60%;
`;

const Title = styled.div`
  font-size: 26px;
  margin-bottom: 10px;
  font-weight: 600;
`;

const AddressInput = styled.input`
  width: 100%;
  height: 40px;
  font-size: 16px;
`;

const Labels = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Price = styled.span`
  font-weight: 600;
`;

const BuyBtn = styled.button`
  width: 100%;
  height: 40px;
  border: solid 1px #fd7272;
  font-weight: 700;
  background-color: #ff4d24;
  color: white;
  float: right;
`;
