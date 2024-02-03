import { AppLayout } from '../components/common/AppLayout';
import DetailPost from '../components/posts/DetailPost/DetailPost';

const DetailPage = () => {
  return (
    <AppLayout hasArrowBtn={false}>
      <DetailPost />
    </AppLayout>
  );
};

export default DetailPage;
