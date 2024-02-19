import axios from 'axios';

interface SignInFormData {
  userId: string;
  password: string;
  passwordConfirm: string;
}

interface SignUpFormData {
  userId: string;
  password: string;
  passwordConfirm: string;
}

const { VITE_CORS_SERVER_URL = '' } = import.meta.env;

const BASE_URL = `${VITE_CORS_SERVER_URL}/auth`;

const checkVerify = async () => {
  const res = await axios.get(`${BASE_URL}/verify`, { withCredentials: true });
  return res.data;
};

const signIn = async (data: SignInFormData) => {
  const { data: userId } = await axios.post(`${BASE_URL}/signin`, data, { withCredentials: true });
  return userId;
};

const signUp = async (data: SignUpFormData) => {
  const {
    data: { userId },
  } = await axios.post(`${BASE_URL}/signup`, data, { withCredentials: true });

  return userId;
};

const signOut = async () => {
  const { data } = await axios.get(`${BASE_URL}/signout`, { withCredentials: true });

  return data.isLogin;
};

const deleteUser = async () => {
  const {
    data: { isLogin, message },
  } = await axios.delete(`${BASE_URL}`, { withCredentials: true });

  return { isLogin, message };
};

export { checkVerify, signIn, signUp, signOut, deleteUser };
