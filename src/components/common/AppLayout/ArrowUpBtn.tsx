import styled from 'styled-components';
import { HiArrowUp } from '../../../utils/icons';
import { useYScroll } from '../../../hooks';

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
  bottom: 10px;
  width: 45px;
  height: 45px;
  background-color: #fff;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 1);
  animation: blink 1s infinite alternate;

  @keyframes blink {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0.2;
    }
  }
`;
