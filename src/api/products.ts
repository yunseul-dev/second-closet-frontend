import axios from 'axios';

const url = `/api/products`;

const categoryInfinite = async (sortOption: string, category: string[], pageParam: number | unknown) => {
  const res = await axios.get(`${url}/category?sort=${sortOption}`, {
    params: {
      category: category,
      page: pageParam,
    },
  });

  return res.data;
};

const myHeartsInfinite = async (sortOption: string, userId: string | null, pageParam: number | unknown) => {
  const { data } = await axios.get(`${url}/myhearts?sort=${sortOption}`, {
    params: {
      userId: userId,
      page: pageParam,
    },
  });

  return data;
};

const myProductsInfinite = async (sortOption: string, userId: string | null, pageParam: number | unknown) => {
  const res = await axios.get(`${url}/myproducts?sort=${sortOption}`, {
    params: {
      userId: userId,
      page: pageParam,
    },
  });

  return res.data;
};

const tagsInfinite = async (tag: string | undefined, sortOption: string, pageParam: number | unknown) => {
  const res = await axios.get(`/api/products/tag?sort=${sortOption}`, {
    params: {
      tag: tag,
      page: pageParam,
    },
  });

  return res.data;
};

const fetchPopulars = async (pageParam: number | unknown) => {
  const res = await axios.get(`${url}/populars/${pageParam}`);
  return res.data;
};

const fetchProduct = async (id: string | undefined) => {
  const res = await axios.get(`${url}/${id}`);
  return res.data;
};

const fetchRecommend = async () => {
  const res = await axios.get(`${url}/recommend`);

  return res.data;
};

const fetchRelated = async (productId: number, category: string) => {
  const res = await axios.get(`/api/products/related/${productId}/${category}`);

  return res.data;
};

const addHeart = async (productId: number, userId: string) => axios.patch(`${url}/hearts/${productId}/${userId}`);

const deleteHeart = async (productId: number, userId: string | null) =>
  axios.delete(`${url}/hearts/${productId}/${userId}`);

const addSold = async (productId: number) => axios.patch(`${url}/update/${productId}`, { sold: true });

const deleteSold = async (productId: number) => axios.patch(`/api/products/update/${productId}`, { sold: false });

const deleteProduct = async (productId: number) => await axios.delete(`${url}/delete/${productId}`);

const createPost = async (formData: FormData) => {
  await axios.post(`${url}/post`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const editPost = async (id: string | undefined, formData: FormData) =>
  axios.patch(`/api/products/edit/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

const searchProduct = (term: string) => axios.get(`/api/products/search/${term}`);

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
