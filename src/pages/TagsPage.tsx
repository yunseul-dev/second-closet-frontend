import { AppLayout } from '../components/common/AppLayout';
import TagsItems from '../components/posts/TagsItems/TagsItems';

const TagsPage = () => {
  return (
    <AppLayout hasArrowBtn={true}>
      <TagsItems />
    </AppLayout>
  );
};

export default TagsPage;
