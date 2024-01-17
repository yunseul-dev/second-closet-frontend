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

interface ChangePwFormData {
  nowPassword: string;
  newPassword: string;
  passwordConfirm: string;
}

const { VITE_CORS_SERVER_URL = '' } = import.meta.env;

const url = `/api/auth`;

const checkVerify = async () => {
  const res = await axios(`${VITE_CORS_SERVER_URL}${url}/verify`, { withCredentials: true });
  return res.data;
};

const signIn = async (data: SignInFormData) => {
  const { data: userId } = await axios.post(`${VITE_CORS_SERVER_URL}${url}/signin`, data, { withCredentials: true });
  return userId;
};

const signUp = async (data: SignUpFormData) => {
  const {
    data: { userId },
  } = await axios.post(`${VITE_CORS_SERVER_URL}${url}/signup`, data, { withCredentials: true });

  return userId;
};

const signOut = async () => {
  const { data } = await axios.get(`${VITE_CORS_SERVER_URL}${url}/signout`, { withCredentials: true });

  return data.isLogin;
};

const deleteUser = async (user: string | null) => {
  const {
    data: { isLogin, message },
  } = await axios.delete(`${VITE_CORS_SERVER_URL}${url}/withdrawal/${user}`, { withCredentials: true });

  return { isLogin, message };
};

const changePassword = async (userId: string | null, data: ChangePwFormData) => {
  await axios.patch(`${VITE_CORS_SERVER_URL}${url}/changepw/${userId}`, data, { withCredentials: true });
};

export { checkVerify, signIn, signUp, signOut, deleteUser, changePassword };
