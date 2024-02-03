import { AppLayout } from '../components/common/AppLayout';
import ChatMessage from '../components/Dialog/ChatMessage/ChatMessage';

const ChatPage = () => {
  return (
    <AppLayout hasArrowBtn={false}>
      <ChatMessage />
    </AppLayout>
  );
};

export default ChatPage;
