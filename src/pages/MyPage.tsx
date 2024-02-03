import { AppLayout } from '../components/common/AppLayout';
import MyCloset from '../components/myPage/MyCloset/MyCloset';

const MyPage = () => {
  return (
    <AppLayout hasArrowBtn={true}>
      <MyCloset />
    </AppLayout>
  );
};

export default MyPage;
