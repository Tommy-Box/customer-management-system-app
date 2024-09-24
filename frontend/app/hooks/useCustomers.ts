import useSWR from 'swr';
import axios from 'axios';
import { Customer } from '@/interfaces/Customer';

const fetcher = (url: string, token: string) =>
  axios
    .get<Customer[]>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

export const useCustomers = () => {
  const token = localStorage.getItem('token');
  const { data, error, mutate } = useSWR(
    token ? ['http://localhost/api/customers', token] : null,
    fetcher
  );

  return {
    customers: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
