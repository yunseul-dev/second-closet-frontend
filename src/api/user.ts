import axios from 'axios';

interface UserData {
  userId: string;
  userName: string;
  account: string;
  bank: string;
  address: string;
}

interface ChangePwFormData {
  nowPassword: string;
  newPassword: string;
  passwordConfirm: string;
}

const { VITE_CORS_SERVER_URL = '' } = import.meta.env;

const BASE_URL = `${VITE_CORS_SERVER_URL}/users`;

const fetchUser = async () => {
  const res = await axios.get(`${BASE_URL}`, { withCredentials: true });
  return res.data;
};

const editUser = async (data: Partial<UserData>) => await axios.patch(`${BASE_URL}`, data, { withCredentials: true });

const updateOption = async (userId: string | null, data: Partial<UserData>) =>
  await axios.patch(`${BASE_URL}/option`, { userId: userId, data: data });

const changePassword = async (data: ChangePwFormData) => {
  await axios.patch(`${BASE_URL}/password`, data, { withCredentials: true });
};

export { editUser, fetchUser, changePassword, updateOption };
