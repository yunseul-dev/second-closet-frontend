import { useEffect } from 'react';
import { styled } from 'styled-components';

const Banner = () => {
  useEffect(() => {
    const img = new Image();
    img.src = '/assets/image/Banner.png.webp';
  }, []);

  return (
    <Container>
      <BannerImg src="/assets/image/Banner.png.webp" alt="배너" />
    </Container>
  );
};

export default Banner;

const Container = styled.div`
  width: 100%;
  height: 276px;
  background-color: #fdecd0;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const BannerImg = styled.img`
  width: 1240px;
  height: 276px;
  object-fit: cover;
`;
