import axios from 'axios';

interface UserData {
  userId: string;
  userName: string;
  account: string;
  bank: string;
  address: string;
}

const { VITE_CORS_SERVER_URL = '' } = import.meta.env;

const url = `/api/users`;

const editUser = async (userId: string | null, data: Partial<UserData>) => {
  await axios.patch(`${VITE_CORS_SERVER_URL}${url}/edit/${userId}`, data);
};

const fetchUser = async (userId: string) => {
  const res = await axios.get(`${VITE_CORS_SERVER_URL}${url}/${userId}`);
  return res.data;
};

export { editUser, fetchUser };
