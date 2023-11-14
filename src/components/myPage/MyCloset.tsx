import styled from 'styled-components';
import MyInfo from './MyInfo';
import AboutProducts from './AboutProducts';
import { useState } from 'react';
import AccountInfoEditModal from './AccountInfoEditModal';

const MyCloset = () => {
  const [isInfoEdit, setIsInfoEdit] = useState('상품');

  return (
    <Container>
      <MyInfo setIsInfoEdit={setIsInfoEdit} isInfoEdit={isInfoEdit} />
      {isInfoEdit === '상품' ? <AboutProducts /> : <AccountInfoEditModal />}
    </Container>
  );
};

export default MyCloset;

const Container = styled.div``;
