import React, { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { MyWords, YourWords } from '.';
import { HiMiniPaperAirplane } from '../../../utils/icons';
import { userState } from '../../../recoil/atom';
import { useChatSocket, useSendMessage } from '../../../hooks';
import { useMessageQuery } from '../../../hooks/queries';
import ItemCard from '../../common/ItemCard/ItemCard';

type DivProps = {
  $focus: boolean;
};

type Messages = {
  senderId: string;
  message: string;
  timestamp: number;
};

interface SelectedMessageProps {
  id: string;
}

const SelectedMessage: React.FC<SelectedMessageProps> = ({ id }) => {
  const { messageInfo } = useMessageQuery(id);

  const { messageId, messages, productInfo } = messageInfo;

  const [chatMessages, setChatMessages] = useState<Messages[]>(messages);

  const userId = useRecoilValue(userState);
  const [isFocused, setIsFocused] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [textValue, setTextValue] = useState('');

  useEffect(() => {
    setChatMessages(messages);
  }, [messages]);

  useEffect(() => {
    const { current } = dialogRef;
    if (current) {
      current.scrollTop = current.scrollHeight;
    }
  });

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
        <ItemCard productInfo={productInfo} size="small" />
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

const Input = styled.div`
  position: absolute;
  bottom: 0;
  width: calc(100% - 40px);
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
  bottom: 13px;
  transform: translateY(-50%);
  color: #c9d1e9;
`;
