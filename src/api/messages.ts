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

const url = '/api/messages';

const fetchMessage = async (id: string | undefined) => {
  const { data } = await axios.get(`${VITE_CORS_SERVER_URL}${url}/message/${id}`);

  return data;
};

const fetchMessages = async (userId: string) => {
  const { data } = await axios.get(`${VITE_CORS_SERVER_URL}${url}/${userId}`);

  return data;
};

const createMessage = async (data: createMessageInterface) => {
  const res = await axios.post(`${VITE_CORS_SERVER_URL}${url}/post`, data);

  return res.data;
};

export { fetchMessage, fetchMessages, createMessage };
