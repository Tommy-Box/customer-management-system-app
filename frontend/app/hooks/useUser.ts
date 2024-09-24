import useSWR from 'swr';
import axios from 'axios';
import { User } from '@/interfaces/User';

const fetcher = (url: string, token: string) =>
  axios
    .get<User>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

export const useUser = () => {
  const token = localStorage.getItem('token');
  const { data, error } = useSWR(
    token ? ['http://localhost/api/user', token] : null,
    fetcher
  );

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};
