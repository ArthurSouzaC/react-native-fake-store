import {FAKE_STORE_URL} from '@env';
import axios from 'axios';

export type Product = {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
};

const fakeStoreAPI = axios.create({
  baseURL: FAKE_STORE_URL,
});

export const getProducts = async () => {
  const response = await fakeStoreAPI.get('/products');
  return response.data as Product[];
};
