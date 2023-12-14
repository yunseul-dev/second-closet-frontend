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

const url = `/api/auth`;

const checkVerify = async () => {
  const res = await axios(`${url}/verify`, { withCredentials: true });
  return res.data;
};

const signIn = async (data: SignInFormData) => {
  const { data: userId } = await axios.post(`${url}/signin`, data, { withCredentials: true });
  return userId;
};

const signUp = async (data: SignUpFormData) => {
  const {
    data: { userId },
  } = await axios.post(`${url}/signup`, data, { withCredentials: true });

  return userId;
};

const signOut = async () => {
  const { data } = await axios.get(`${url}/signout`, { withCredentials: true });

  return data.isLogin;
};

const deleteUser = async (user: string | null) => {
  const {
    data: { isLogin, message },
  } = await axios.delete(`${url}/withdrawal/${user}`, { withCredentials: true });

  return { isLogin, message };
};

const changePassword = async (userId: string | null, data: ChangePwFormData) => {
  await axios.patch(`${url}/changepw/${userId}`, data, { withCredentials: true });
};

export { checkVerify, signIn, signUp, signOut, deleteUser, changePassword };
