import type { IUser, ResponseRegister } from '../types/global';
import jsCookie from 'js-cookie';
import axios from '../axios';

export const loadUser = async (
  data: ResponseRegister,
  setUser: (user: IUser) => void
) => {
  setUser(data.user);

  jsCookie.set('authenticate', data.token, {
    path: '/',
    secure: location.protocol === 'https',
    sameSite: 'strict',
    expires: 15
  });
  
  axios.defaults.headers.common.Authorization = data.token;
};
