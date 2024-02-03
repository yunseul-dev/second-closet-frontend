import { AppLayout } from '../components/common/AppLayout';
import Main from '../components/root/Main';

const Root = () => {
  return (
    <AppLayout hasArrowBtn={true}>
      <Main />
    </AppLayout>
  );
};

export default Root;
