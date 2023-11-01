import { useParams } from 'react-router-dom';
import AppLayout from '../components/common/AppLayout';
import DetailPost from '../components/posts/DetailPost';

const DetailPage = () => {
  const { id } = useParams();
  return (
    <AppLayout>
      <DetailPost key={id} />
    </AppLayout>
  );
};

export default DetailPage;
