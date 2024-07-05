import jsCookie from 'js-cookie';
import axios from '../axios';

export const loadToken = async (token: string) => {
  jsCookie.set('authenticate', token, {
    path: '/',
    secure: location.protocol === 'https:',
    sameSite: 'strict',
    expires: 15
  });
  
  axios.defaults.headers.common.Authorization = token;
};
