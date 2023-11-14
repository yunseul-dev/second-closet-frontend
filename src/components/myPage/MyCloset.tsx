import styled from 'styled-components';
import MyInfo from './MyInfo';
import AboutProducts from './AboutProducts';
import { useState } from 'react';
import AccountInfoEdit from './AccountInfoEdit';

const MyCloset = () => {
  const [isInfoEdit, setIsInfoEdit] = useState('product');

  return (
    <Container>
      <MyInfo setIsInfoEdit={setIsInfoEdit} isInfoEdit={isInfoEdit} />
      {isInfoEdit === 'product' ? <AboutProducts /> : <AccountInfoEdit setIsInfoEdit={setIsInfoEdit} />}
    </Container>
  );
};

export default MyCloset;

const Container = styled.div``;
