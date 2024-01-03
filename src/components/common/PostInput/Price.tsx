import styled from 'styled-components';
import React, { Dispatch, SetStateAction, ChangeEvent } from 'react';

interface PriceProps {
  setDiscount: Dispatch<SetStateAction<boolean>>;
  price: string;
  setPrice: Dispatch<SetStateAction<string>>;
  discount?: boolean;
}

const Price: React.FC<PriceProps> = ({ setDiscount, price, setPrice, discount }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numValue = parseInt(e.target.value.replace(/,/g, ''), 10);
    if (!isNaN(numValue)) {
      setPrice(numValue.toLocaleString());
    } else {
      setPrice('');
    }
  };

  return (
    <PriceContainer>
      <Input type="text" placeholder="가격을 입력해주세요." value={price} onChange={handleChange} />원
      <PriceSuggestion>
        <input
          type="checkbox"
          onChange={e => setDiscount(e.target.checked)}
          defaultChecked={discount}
          aria-label="가격 제안받기"
        />
        가격 제안받기
      </PriceSuggestion>
    </PriceContainer>
  );
};

export default Price;

const PriceContainer = styled.div`
  width: 70%;
`;

const Input = styled.input`
  width: 30%;
  height: 40px;
  font-size: 16px;
  font-weight: 500;
`;

const PriceSuggestion = styled.div`
  font-size: 14px;
  padding: 10px 0 10px 0;
`;
