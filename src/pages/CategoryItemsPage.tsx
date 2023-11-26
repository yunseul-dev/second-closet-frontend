import { AppLayout } from '../components/common/AppLayout';
import { CategoryItems } from '../components/posts/CategoryItems';
import { useParams } from 'react-router-dom';

const CategoryItemsPage = () => {
  const categoryParams = useParams();
  const categories = Object.values(categoryParams) as string[];

  return (
    <AppLayout>
      <CategoryItems key={categories.join('')} />
    </AppLayout>
  );
};

export default CategoryItemsPage;
