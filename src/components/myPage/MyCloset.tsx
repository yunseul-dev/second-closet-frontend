import styled from 'styled-components';
import MyInfo from './MyInfo';
import AboutProducts from './AboutProducts';

const MyCloset = () => {
  return (
    <Container>
      <MyInfo />
      <AboutProducts />
    </Container>
  );
};

export default MyCloset;

const Container = styled.div``;
