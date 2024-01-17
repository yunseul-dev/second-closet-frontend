import axios from 'axios';

const { VITE_CORS_SERVER_URL = '' } = import.meta.env;

const url = `/api/products`;

const categoryInfinite = async (sortOption: string, category: string[], pageParam: number | unknown) => {
  const res = await axios.get(`${VITE_CORS_SERVER_URL}${url}/category?sort=${sortOption}`, {
    params: {
      category: category,
      page: pageParam,
    },
  });

  return res.data;
};

const myHeartsInfinite = async (sortOption: string, userId: string | null, pageParam: number | unknown) => {
  const { data } = await axios.get(`${VITE_CORS_SERVER_URL}${url}/myhearts?sort=${sortOption}`, {
    params: {
      userId: userId,
      page: pageParam,
    },
  });

  return data;
};

const myProductsInfinite = async (sortOption: string, userId: string | null, pageParam: number | unknown) => {
  const res = await axios.get(`${VITE_CORS_SERVER_URL}${url}/myproducts?sort=${sortOption}`, {
    params: {
      userId: userId,
      page: pageParam,
    },
  });

  return res.data;
};

const tagsInfinite = async (tag: string | undefined, sortOption: string, pageParam: number | unknown) => {
  const res = await axios.get(`${VITE_CORS_SERVER_URL}${url}/tag?sort=${sortOption}`, {
    params: {
      tag: tag,
      page: pageParam,
    },
  });

  return res.data;
};

const fetchPopulars = async (pageParam: number | unknown) => {
  const res = await axios.get(`${VITE_CORS_SERVER_URL}${url}/populars/${pageParam}`);

  return res.data;
};

const fetchProduct = async (id: string | undefined) => {
  const res = await axios.get(`${VITE_CORS_SERVER_URL}${url}/${id}`);

  return res.data;
};

const fetchRecommend = async () => {
  const res = await axios.get(`${VITE_CORS_SERVER_URL}${url}/recommend`);

  return res.data;
};

const fetchRelated = async (productId: string, category: string) => {
  const res = await axios.get(`${VITE_CORS_SERVER_URL}${url}/related/${productId}/${category}`);

  return res.data;
};

const addHeart = async (productId: string, userId: string) =>
  await axios.patch(`${VITE_CORS_SERVER_URL}${url}/hearts/${productId}/${userId}`);

const deleteHeart = async (productId: string, userId: string | null) =>
  await axios.delete(`${VITE_CORS_SERVER_URL}${url}/hearts/${productId}/${userId}`);

const addSold = async (productId: string) =>
  await axios.patch(`${VITE_CORS_SERVER_URL}${url}/update/${productId}`, { sold: true });

const deleteSold = async (productId: string) =>
  await axios.patch(`${VITE_CORS_SERVER_URL}${url}/update/${productId}`, { sold: false });

const deleteProduct = async (productId: string) =>
  await axios.delete(`${VITE_CORS_SERVER_URL}${url}/delete/${productId}`);

const createPost = async (formData: FormData) => {
  await axios.post(`${VITE_CORS_SERVER_URL}${url}/post`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const editPost = async (id: string | undefined, formData: FormData) =>
  await axios.patch(`${VITE_CORS_SERVER_URL}${url}/edit/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

const searchProduct = async (term: string) => axios.get(`${VITE_CORS_SERVER_URL}${url}/search/${term}`);

export {
  categoryInfinite,
  myHeartsInfinite,
  myProductsInfinite,
  fetchPopulars,
  fetchProduct,
  fetchRecommend,
  fetchRelated,
  tagsInfinite,
  addHeart,
  addSold,
  deleteSold,
  deleteHeart,
  deleteProduct,
  createPost,
  editPost,
  searchProduct,
};
