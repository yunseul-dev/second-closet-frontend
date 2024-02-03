import { AppLayout } from '../components/common/AppLayout';
import CreatePost from '../components/posts/CreatePost/CreatePost';

const CreatePostPage = () => {
  return (
    <AppLayout hasArrowBtn={false}>
      <CreatePost />
    </AppLayout>
  );
};

export default CreatePostPage;
