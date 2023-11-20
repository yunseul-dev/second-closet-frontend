import styled from 'styled-components';
import MyWords from './MyWords';
import YourWords from './YourWords';
import formatTimeAgo from '../../../utils/formatTimeAgo';
import { HiMiniPaperAirplane } from 'react-icons/hi2';
import useMessageQuery from '../../../hooks/queries/useMessageQuery';
import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { useParams } from 'react-router-dom';
import useChatSocket from '../../../hooks/mutations/useChatSocket';

import { useRecoilValue } from 'recoil';
import { userState } from '../../../recoil/atom/userState';
import useSendMessage from '../../../hooks/mutations/useSendMessage';

type DivProps = {
  $focus: boolean;
};

type Messages = {
  senderId: string;
  message: string;
  timestamp: number;
};

const SelectedMessage = () => {
  const { id } = useParams();

  const userId = useRecoilValue(userState);
  const [isFocused, setIsFocused] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [textValue, setTextValue] = useState('');

  useEffect(() => {
    const { current } = dialogRef;
    if (current) {
      current.scrollTop = current.scrollHeight;
    }
  });

  const { messageInfo } = useMessageQuery(+id);

  const { messageId, messages, productInfo } = messageInfo;

  const [chatMessages, setChatMessages] = useState<Messages[]>(messages);

  useChatSocket(messageId, setChatMessages);

  const sendMessage = useSendMessage();

  const handleEnterKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage({ messageId, userId, textValue });
      setTextValue('');
    }
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };

  return (
    <>
      <Content ref={dialogRef} $focus={isFocused}>
        <Item>
          <ImageContainer>
            <Image src={`http://localhost:5023/api/products/uploads/${productInfo.img}`} />
          </ImageContainer>
          <ItemInfoContainer>
            <ItemName>{productInfo.productName}</ItemName>
            <ItemInfo>
              <div>
                <Price>{productInfo.price}</Price>원
              </div>
              <MiniInfo>
                <div>{formatTimeAgo(productInfo.createdAt)}</div>
              </MiniInfo>
            </ItemInfo>
          </ItemInfoContainer>
        </Item>
        {chatMessages.map(({ senderId, message, timestamp }) => {
          if (senderId === userId) {
            return <MyWords words={message} key={timestamp} timestamp={timestamp} />;
          } else {
            return <YourWords senderId={senderId} words={message} key={timestamp} timestamp={timestamp} />;
          }
        })}
      </Content>
      <Input>
        <TextArea
          value={textValue}
          onChange={handleTextChange}
          placeholder="메세지를 입력하세요."
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleEnterKeyDown}
        />
        <PaperAirplane />
      </Input>
    </>
  );
};

export default SelectedMessage;

const Content = styled.div<DivProps>`
  display: flex;
  flex-direction: column;
  height: ${({ $focus }) => ($focus ? 'calc(100vh - 180px - 130px)' : 'calc(100vh - 180px - 80px)')};
  overflow: auto;
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
