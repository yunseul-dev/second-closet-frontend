import { AppLayout } from '../components/common/AppLayout';
import { CategoryItems } from '../components/posts/CategoryItems';
import { ArrowUpBtn } from '../components/common/AppLayout';

const CategoryItemsPage = () => {
  return (
    <AppLayout hasArrowBtn={true}>
      <CategoryItems />
      <ArrowUpBtn />
    </AppLayout>
  );
};

export default CategoryItemsPage;
