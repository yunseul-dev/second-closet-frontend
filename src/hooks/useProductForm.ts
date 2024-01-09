import { useState, useRef } from 'react';
import useFileUpload from './useFileUpload';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../recoil/atom';
import { createPost, editPost } from '../api/products';

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

interface ProductInfoProps extends PostData {
  imgs: string[];
}

interface EditProps extends PostData {
  imgs?: string[];
}

const useProductForm = (
  productInfo: ProductInfoProps = {
    userId: '',
    productName: '',
    categories: [],
    count: '',
    price: '',
    discount: false,
    delivery: false,
    exchange: false,
    description: '',
    tags: [],
    size: '',
    facetoface: false,
    imgs: [],
  },
) => {
  const navigate = useNavigate();
  const userId = useRecoilValue(userState);

  const { photoFiles, imgPrevUrls, handleDeleteFile, handleFileChange } = useFileUpload();
  const productNameRef = useRef<HTMLInputElement>(null);
  const countRef = useRef<HTMLSelectElement>(null);
  const sizeRef = useRef<HTMLSelectElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const [price, setPrice] = useState(productInfo?.price);
  const [exchangeOption, setExchangeOption] = useState<boolean>(productInfo?.exchange);
  const [delivery, setDelivery] = useState(productInfo?.delivery);
  const [discount, setDiscount] = useState(productInfo?.discount);
  const [tags, setTags] = useState<string[]>(productInfo?.tags);
  const [inputValue, setInputValue] = useState('');
  const [canFace, setCanFace] = useState<boolean>(productInfo?.facetoface);
  const [categories, setCategories] = useState<string[]>(productInfo?.categories);
  const [prevImgs, setPrevImgs] = useState<string[]>(productInfo?.imgs);

  const appendPhotoFiles = (formData: FormData) => {
    if (photoFiles) {
      photoFiles.forEach(file => {
        formData.append('photo', file);
      });
    }
  };

  const checkRequiredFields = () => {
    return (
      productNameRef.current?.value &&
      (imgPrevUrls.length || prevImgs.length) &&
      categories.length &&
      sizeRef.current?.value &&
      countRef.current?.value &&
      price
    );
  };

  const createFormData = () => {
    const formData = new FormData();

    appendPhotoFiles(formData);

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

      if (checkRequiredFields()) {
        createPost(formData);
        navigate('/');
      } else {
        console.log('필수 항목을 모두 입력해주세요');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSubmit = async (id: string | undefined) => {
    try {
      const formData = new FormData();

      appendPhotoFiles(formData);

      const updatedData: Partial<EditProps> = {};

      if (productNameRef.current?.value !== productInfo?.productName) {
        updatedData.productName = productNameRef.current?.value;
      }

      if (countRef.current?.value !== productInfo?.count) {
        updatedData.count = countRef.current?.value;
      }

      if (categories !== productInfo?.categories) {
        updatedData.categories = categories;
      }

      if (price !== productInfo?.price) {
        updatedData.price = price;
      }

      if (discount !== productInfo?.discount) {
        updatedData.discount = discount;
      }

      if (delivery !== productInfo?.delivery) {
        updatedData.delivery = delivery;
      }

      if (exchangeOption !== productInfo?.exchange) {
        updatedData.exchange = exchangeOption;
      }

      if (commentRef.current?.value !== productInfo?.description) {
        updatedData.description = commentRef.current?.value;
      }

      if (tags !== productInfo?.tags) {
        updatedData.tags = tags;
      }

      if (sizeRef.current?.value !== productInfo?.size) {
        updatedData.size = sizeRef.current?.value;
      }

      if (canFace !== productInfo?.facetoface) {
        updatedData.facetoface = canFace;
      }

      updatedData.imgs = prevImgs;

      console.log('updatedData?', productInfo?.imgs);

      formData.append('data', JSON.stringify(updatedData));
      console.log('formData', formData);

      if (
        productNameRef.current?.value &&
        (imgPrevUrls.length || prevImgs.length) &&
        categories.length &&
        sizeRef.current?.value &&
        countRef.current?.value
      ) {
        await editPost(id, formData);
        navigate('/mypage');
      } else {
        console.log('모든 항목을 입력해주세요');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImsiSubmit = async () => {
    try {
      const formData = createFormData();

      if (checkRequiredFields()) {
        createPost(formData);
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
    prevImgs,
    setPrevImgs,
    handleImsiSubmit,
    handleSubmit,
    handleEditSubmit,
  };
};

export default useProductForm;
