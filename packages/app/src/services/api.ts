import axios from 'axios';
import { User } from '../types/user';
import { Plan } from '../types/plan';

const api = axios.create({
  baseURL: 'https://rimac-front-end-challenge.netlify.app/api',
});

export const fetchUser = async (): Promise<User> => {
  const { data } = await api.get('/user.json');
  return data;
};

export const fetchPlans = async (): Promise<{ list: Plan[] }> => {
  const { data } = await api.get('/plans.json');
  return data;
};