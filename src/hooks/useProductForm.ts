import { useState, useRef } from 'react';
import useFileUpload from './useFileUpload';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { userState } from '../recoil/atom/userState';

interface PostData {
  userId: string | null;
  productName: string;
  categories: string[];
  count: string;
  price: string;
  discount: boolean;
  delivery: boolean;
  exchange: boolean;
  description: string;
  tags: string[];
  size: string;
  facetoface: boolean;
}

export const useProductForm = () => {
  const navigate = useNavigate();
  const userId = useRecoilValue(userState);

  const { photoFiles, imgPrevUrls, handleDeleteFile, handleFileChange } = useFileUpload();
  const productNameRef = useRef<HTMLInputElement>(null);
  const countRef = useRef<HTMLSelectElement>(null);
  const sizeRef = useRef<HTMLSelectElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const [price, setPrice] = useState('');
  const [exchangeOption, setExchangeOption] = useState<boolean>(false);
  const [delivery, setDelivery] = useState(true);
  const [discount, setDiscount] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [canFace, setCanFace] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);

  const createFormData = () => {
    const formData = new FormData();

    if (photoFiles) {
      photoFiles.map(file => {
        formData.append('photo', file);
      });
    }

    const data: PostData = {
      userId: userId,
      productName: productNameRef.current ? productNameRef.current.value : '',
      categories: categories,
      count: countRef.current ? countRef.current.value : '',
      price: price,
      discount: discount,
      delivery: delivery,
      exchange: exchangeOption,
      description: commentRef.current ? commentRef.current.value : '',
      tags: tags,
      size: sizeRef.current ? sizeRef.current.value : '',
      facetoface: canFace,
    };

    formData.append('data', JSON.stringify(data));

    return formData;
  };

  const handleSubmit = async () => {
    try {
      const formData = createFormData();

      if (
        productNameRef.current?.value &&
        imgPrevUrls.length &&
        categories.length &&
        countRef.current?.value &&
        price &&
        sizeRef.current?.value
      ) {
        await axios.post('/api/products/post', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        navigate('/');
      } else {
        console.log('필수 항목을 모두 입력해주세요');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImsiSubmit = async () => {
    try {
      const formData = createFormData();

      if (
        productNameRef.current?.value ||
        imgPrevUrls.length ||
        categories.length ||
        sizeRef.current?.value ||
        countRef.current?.value ||
        price
      ) {
        await axios.post('/api/products/post', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        navigate('/');
      } else {
        console.log('아무것도 등록되지 않았습니다. 이대로 저장하시겠습니까?');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    photoFiles,
    imgPrevUrls,
    handleDeleteFile,
    handleFileChange,
    productNameRef,
    countRef,
    sizeRef,
    commentRef,
    price,
    setPrice,
    exchangeOption,
    setExchangeOption,
    delivery,
    setDelivery,
    discount,
    setDiscount,
    tags,
    setTags,
    inputValue,
    setInputValue,
    canFace,
    setCanFace,
    categories,
    setCategories,
    handleSubmit,
    handleImsiSubmit,
  };
};
