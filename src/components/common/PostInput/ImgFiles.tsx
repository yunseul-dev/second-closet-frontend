import styled from 'styled-components';
import React from 'react';
import { FaXmark, AiOutlineCamera } from '../../../utils/icons';

interface ImgFileContainerProps {
  imgPrevUrls: string[];
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteFile: (index: number) => void;
  extraChildren?: React.ReactNode;
}

type ImgProps = {
  idx: number;
};

const ImgFiles: React.FC<ImgFileContainerProps> = ({
  imgPrevUrls,
  handleFileChange,
  handleDeleteFile,
  extraChildren,
}) => {
  return (
    <ImgFileContainer>
      <FileLabel htmlFor="file-upload">
        <div>
          <AiOutlineCamera />
        </div>
        <div>이미지 등록</div>
      </FileLabel>
      <InputFile id="file-upload" type="file" onChange={handleFileChange} />
      {imgPrevUrls &&
        imgPrevUrls.map((imgPrevUrl, idx) => {
          return (
            <ImagePreview idx={idx + 1} key={idx}>
              <Image src={imgPrevUrl} alt="Image Preview" />
              <XImg>
                <FaXmark onClick={() => handleDeleteFile(idx)} />
              </XImg>
            </ImagePreview>
          );
        })}
      {extraChildren}
    </ImgFileContainer>
  );
};

export default ImgFiles;

const ImgFileContainer = styled.div`
  flex-wrap: wrap;
  display: flex;
  width: 80%;
`;

const FileLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 32%;
  height: 200px;
  background-color: #f0f0f0;
  border: 1px solid gray;
`;

const ImagePreview = styled.div<ImgProps>`
  width: 32%;
  height: 200px;
  margin-bottom: 1%;
  margin-left: ${({ idx }) => idx % 3 && '2%'};
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const XImg = styled.button`
  color: white;
  position: absolute;
  top: 5px;
  right: 6px;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  background-color: rgba(128, 128, 128, 0.5);
  z-index: 99;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputFile = styled.input`
  display: none;
`;
