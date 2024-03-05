import axios from 'axios';

const { VITE_CORS_SERVER_URL = '' } = import.meta.env;

const BASE_URL = `${VITE_CORS_SERVER_URL}/products`;

const categoryInfinite = async (sortOption: string, category: string[], pageParam: number | unknown) => {
  const res = await axios.get(`${BASE_URL}/category?sort=${sortOption}&page=${pageParam}`, {
    params: {
      category: category,
    },
  });

  return res.data;
};

const myHeartsInfinite = async (sortOption: string, pageParam: number | unknown) => {
  const { data } = await axios.get(`${BASE_URL}/myhearts?sort=${sortOption}&page=${pageParam}`, {
    withCredentials: true,
  });

  return data;
};

const myProductsInfinite = async (sortOption: string, pageParam: number | unknown) => {
  const res = await axios.get(`${BASE_URL}/myproducts?sort=${sortOption}&page=${pageParam}`, { withCredentials: true });

  return res.data;
};

const tagsInfinite = async (tag: string | null, sortOption: string, pageParam: number | unknown) => {
  const res = await axios.get(`${BASE_URL}/tag?sort=${sortOption}&tag=${tag}&page=${pageParam}`);

  return res.data;
};

const fetchPopulars = async (pageParam: number | unknown) => {
  const res = await axios.get(`${BASE_URL}/populars?page=${pageParam}`);

  return res.data;
};

const fetchProduct = async (id: string | undefined) => {
  const res = await axios.get(`${BASE_URL}/${id}`);

  return res.data;
};

const fetchRecommend = async () => {
  const res = await axios.get(`${BASE_URL}/recommend`);

  return res.data;
};

const fetchRelated = async (productId: string, category: string) => {
  const res = await axios.get(`${BASE_URL}/related?id=${productId}&category=${category}`);

  return res.data;
};

const addHeart = async (productId: string) =>
  await axios.patch(`${BASE_URL}/hearts/${productId}`, { withCredentials: true });

const deleteHeart = async (productId: string) =>
  await axios.delete(`${BASE_URL}/hearts/${productId}`, { withCredentials: true });

const addSold = async (productId: string) => await axios.patch(`${BASE_URL}/update/${productId}`, { sold: true });

const deleteSold = async (productId: string) => await axios.patch(`${BASE_URL}/update/${productId}`, { sold: false });

const deleteProduct = async (productId: string) => await axios.delete(`${BASE_URL}/${productId}`);

const createPost = async (formData: FormData) => {
  await axios.post(`${BASE_URL}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const editPost = async (id: string | undefined, formData: FormData) =>
  await axios.patch(`${BASE_URL}/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

const searchProduct = async (term: string) =>
  axios.get(`${BASE_URL}/search`, {
    params: {
      q: term,
    },
  });

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
