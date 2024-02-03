import { AppLayout } from '../components/common/AppLayout';
import EditPost from '../components/posts/EditPost/EditPost';

const EditPostPage = () => {
  return (
    <AppLayout hasArrowBtn={false}>
      <EditPost />
    </AppLayout>
  );
};

export default EditPostPage;
