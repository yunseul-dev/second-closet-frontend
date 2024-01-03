import styled from 'styled-components';
import { LiaHomeSolid, LiaAngleRightSolid } from '../../../utils/icons';
import { Category } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent } from 'react';

interface Categories {
  categories: string[];
}

const CategoryTab: React.FC<Categories> = ({ categories }) => {
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>, array: string[]) => {
    const selectedPage = [...array, e.target.value].join('/');
    navigate(`/category/${selectedPage}`);
  };

  return (
    <Container>
      <LiaHomeSolid />홈
      <LiaAngleRightSolid />
      <Select defaultValue={categories[0]} onChange={e => handleChange(e, [])} aria-label="대분류">
        {Object.keys(Category).map(category => (
          <option key={category} value={category} label={category} />
        ))}
      </Select>
      {categories[1] && (
        <>
          <LiaAngleRightSolid />
          <Select defaultValue={categories[1]} onChange={e => handleChange(e, [categories[0]])} aria-label="중분류">
            {categories[0] &&
              Object.keys(Category[categories[0]]).map(category => (
                <option key={category} value={category} label={category} />
              ))}
          </Select>
        </>
      )}
      {categories[2] && (
        <>
          <LiaAngleRightSolid />
          <Select
            defaultValue={categories[2]}
            onChange={e => handleChange(e, [categories[0], categories[1]])}
            aria-label="소분류">
            {categories[1] &&
              Object.values(Category[categories[0]][categories[1]]).map(category => (
                <option key={category} value={category} label={category} />
              ))}
          </Select>
        </>
      )}
    </Container>
  );
};

export default CategoryTab;

const Container = styled.div`
  padding: 10px 0 10px 0;
  font-size: small;
  color: #908d8d;
  display: flex;
  gap: 5px;
  align-items: center;
`;

const Select = styled.select`
  width: 150px;
  height: 25px;
  border-color: #bbb7b7;
`;
