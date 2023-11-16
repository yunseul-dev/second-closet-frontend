import React from 'react';

interface OptionRadioProps {
  name: string;
  state: boolean;
  setState: (delivery: boolean) => void;
}

const OptionRadio: React.FC<OptionRadioProps> = ({ name, state, setState }) => {
  return (
    <>
      <label>
        <input type="radio" value="true" name={name} checked={state} onChange={() => setState(true)} />{' '}
        {name === 'delivery' ? '배송비포함' : '가능'}
      </label>
      <label>
        <input type="radio" value="false" name={name} checked={!state} onChange={() => setState(false)} />{' '}
        {name === 'delivery' ? '배송비별도' : '불가'}
      </label>
    </>
  );
};

export default OptionRadio;
