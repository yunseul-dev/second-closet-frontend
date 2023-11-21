import styled from 'styled-components';
import { HiArrowUp } from 'react-icons/hi';
import useYScroll from '../../hooks/useScrollY';

const ArrowUpBtn = ({ boundary = 300 }) => {
  const yPos = useYScroll();

  const handleArrowUpClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    yPos >= boundary && (
      <ArrowUpButton onClick={handleArrowUpClick}>
        <HiArrowUp />
      </ArrowUpButton>
    )
  );
};

export default ArrowUpBtn;

const ArrowUpButton = styled.button`
  position: fixed;
  right: 100px;
  bottom: 20px;
  width: 40px;
  height: 40px;
  background-color: #fff;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  animation: blink 1s infinite alternate;

  @keyframes blink {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0.3;
    }
  }
`;
