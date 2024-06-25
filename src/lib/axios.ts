import rawAxios from 'axios';
import { DIR } from './config';
import { Method } from './types/enums';

const axios = rawAxios.create({
  baseURL: DIR + '/api',
  method: Method.GET
});

export default axios;
