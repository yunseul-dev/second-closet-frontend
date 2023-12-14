import axios from 'axios';

const url = `/api/users`;

interface UserData {
  userId: string;
  userName: string;
  account: string;
  bank: string;
  address: string;
}

const editUser = async (userId: string | null, data: Partial<UserData>) => {
  await axios.patch(`${url}/edit/${userId}`, data);
};

const fetchUser = async (userId: string) => {
  const res = await axios.get(`${url}/${userId}`);
  return res.data;
};

export { editUser, fetchUser };
