import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaCircleUser } from 'react-icons/fa6';
import { HiMiniPaperAirplane } from 'react-icons/hi2';

type DivProps = {
  $focus: boolean;
};

const Dialog = () => {
  const [isFocused, setIsFocused] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { current } = dialogRef;
    if (current) {
      current.scrollTop = current.scrollHeight;
    }
  });

  return (
    <Container>
      <Content ref={dialogRef} $focus={isFocused}>
        <Item>
          <ImageContainer>
            <Image src="http://localhost:5023/api/products/uploads/1698573139386.jpg" />
          </ImageContainer>
          <ItemInfoContainer>
            <ItemName>글로니 95 DESTROYED STRAIGHT FIT JEANS</ItemName>
            <ItemInfo>
              <div>
                <Price>100,000</Price>원
              </div>
              <MiniInfo>
                <div>2주 전</div>
              </MiniInfo>
            </ItemInfo>
          </ItemInfoContainer>
        </Item>
        <MyWords>안녕하세요! 해당 상품 구매하고 싶습니다!</MyWords>
        <User>
          <You /> alskfl
        </User>
        <YourWords>하나은행 0000000000으로 배송비 포함 10000원 입금 부탁드립니다!</YourWords>
        <MyWords>
          입금 완료했습니다! <br />
          창원시 성산구 비음로 267 108동 4호로 보내주세요!
        </MyWords>
        <User>
          <You /> alskfl
        </User>
        <YourWords>네! 운송장 번호는 cj 택배 105526485352 입니다.</YourWords>
        <MyWords>네 확인했습니다!</MyWords>
      </Content>
      <Input>
        <TextArea
          placeholder="메세지를 입력하세요."
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}></TextArea>
        <PaperAirplane />
      </Input>
    </Container>
  );
};

export default Dialog;

const Container = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  position: relative;
  width: 60%;
  height: calc(100vh - 180px);
  padding: 20px;
`;

const Content = styled.div<DivProps>`
  display: flex;
  flex-direction: column;
  height: ${({ $focus }) => ($focus ? 'calc(100vh - 180px - 130px)' : 'calc(100vh - 180px - 80px)')};
  overflow: auto;
`;

const MyWords = styled.div`
  background-color: #ff4d24;
  display: inline-flex;
  align-self: flex-end;
  padding: 10px;
  border-radius: 10px 10px 0 10px;
  margin-bottom: 15px;
  color: #fff;
`;

const YourWords = styled.div`
  background-color: rgba(255, 77, 36, 0.3);
  display: inline-flex;
  align-self: flex-start;
  padding: 10px;
  border-radius: 0 10px 10px 10px;
  margin-bottom: 15px;
`;

const Item = styled.div`
  width: 70%;
  height: 250px;
  margin: 10px;
  border: 1px solid #e0e0e0c4;
  background-color: #fff;
  color: #000;
  display: flex;
  padding: 15px;
`;

const ImageContainer = styled.div`
  width: 50%;
  height: 220px;
  border: 1px solid #e0e0e0c4;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ItemInfoContainer = styled.div`
  width: 50%;
  font-size: 14px;
  height: 60px;
  padding: 10px 20px 10px 20px;
`;

const ItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemName = styled.div`
  width: 100%;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 5px;
`;

const MiniInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: #888888;
`;

const Price = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

const You = styled(FaCircleUser)`
  color: #ff4d24;
  margin-right: 5px;
`;

const Input = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 50px;
  resize: none;
  border-radius: 10px;
  padding: 15px;
  border-color: #c9d1e9;
  &::placeholder {
    color: #c9d1e9;
    font-size: 14px;
    font-weight: 500;
  }
  &:focus {
    height: 100px;
    border: 1px solid #ff4d24;
    outline: none;
  }
`;

const PaperAirplane = styled(HiMiniPaperAirplane)`
  position: absolute;
  right: 10px;
  bottom: 15px;
  transform: translateY(-50%);
  color: #c9d1e9;
`;

const User = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;
