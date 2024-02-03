import { AppLayout } from '../components/common/AppLayout';
import { AccountInfoEdit } from '../components/accounts';

const AccountsPage = () => {
  return (
    <AppLayout hasArrowBtn={false}>
      <AccountInfoEdit />
    </AppLayout>
  );
};

export default AccountsPage;
