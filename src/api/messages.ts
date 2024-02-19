import axios from 'axios';

interface createMessageInterface {
  productId: string;
  buyerId: string;
  sellerId: string;
  productInfo: {
    productName: string;
    price: string;
    delivery: boolean;
    discount: boolean;
    createdAt: string;
    img: string;
  };
}

const { VITE_CORS_SERVER_URL = '' } = import.meta.env;

const BASE_URL = `${VITE_CORS_SERVER_URL}/messages`;

const fetchMessage = async (id: string | undefined) => {
  const { data } = await axios.get(`${BASE_URL}/${id}`);

  return data;
};

const fetchMessages = async () => {
  const { data } = await axios.get(`${BASE_URL}/user`, { withCredentials: true });

  return data;
};

const createMessage = async (data: createMessageInterface) => {
  const res = await axios.post(`${BASE_URL}`, data);

  return res.data;
};

export { fetchMessage, fetchMessages, createMessage };
