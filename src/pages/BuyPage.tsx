import { AppLayout } from '../components/common/AppLayout';
import PaymentItem from '../components/posts/PaymentItem/PaymentItem';

const BuyPage = () => {
  return (
    <AppLayout hasArrowBtn={false}>
      <PaymentItem />
    </AppLayout>
  );
};

export default BuyPage;
