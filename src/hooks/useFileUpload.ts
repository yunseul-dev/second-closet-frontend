import { useState, ChangeEvent } from 'react';

const useFileUpload = () => {
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [imgPrevUrls, setImgPrevUrls] = useState<string[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (photoFiles.length === 11) return;

    const file = e.target.files && e.target.files[0];

    if (file) {
      // 파일 확장자 확인 -> 사진만 업로드
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
      const fileExtension = file.name.split('.').pop()?.toLocaleLowerCase() || '';
      const isImageFile = allowedExtensions.includes(fileExtension);

      if (isImageFile) {
        setPhotoFiles([...photoFiles, file]);

        const reader = new FileReader();
        reader.onload = () => {
          setImgPrevUrls([...imgPrevUrls, reader.result as string]);
        };
        reader.readAsDataURL(file);
      } else {
        console.log('선택한 파일은 사진 파일이 아닙니다.');
      }
    }
  };

  const handleDeleteFile = (idx: number) => {
    const updatedImgPrevUrls = [...imgPrevUrls];
    updatedImgPrevUrls.splice(idx, 1);
    setImgPrevUrls(updatedImgPrevUrls);

    const updatedPhotoFiles = [...photoFiles];
    updatedPhotoFiles.splice(idx, 1);
    setPhotoFiles(updatedPhotoFiles);
  };

  const clearFiles = () => {
    setPhotoFiles([]);
    setImgPrevUrls([]);
  };

  return { photoFiles, imgPrevUrls, handleFileChange, handleDeleteFile, clearFiles };
};

export default useFileUpload;
