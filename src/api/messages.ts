import axios from 'axios';

interface createMessageInterface {
  productId: number;
  buyerId: string;
  sellerId: string;
  productInfo: {
    productName: string;
    price: string;
    delivery: boolean;
    discount: boolean;
    createdAt: number;
    img: string;
  };
}

const url = '/api/messages';

const fetchMessage = async (id: string | undefined) => {
  const { data } = await axios.get(`${url}/message/${id}`);

  return data;
};

const fetchMessages = async (userId: string) => {
  const { data } = await axios.get(`/api/messages/${userId}`);

  return data;
};

const createMessage = async (data: createMessageInterface) => {
  const res = await axios.post(`${url}/post`, data);

  return res.data;
};

export { fetchMessage, fetchMessages, createMessage };
