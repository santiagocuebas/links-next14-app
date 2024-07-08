import { setCookie } from 'cookies-next';
import axios from '../axios';

export const loadToken = async (token: string) => {
  setCookie('authenticate', token, {
    path: '/',
    secure: window.location.protocol.includes('https'),
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 15
  });
  
  axios.defaults.headers.common.Authorization = token;
};
