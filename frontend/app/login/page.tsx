'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppDispatch } from '../store/hooks';
import { fetchUser } from '../store/slices/userSlice';
import { fetchCustomers } from '../store/slices/customerSlice';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { isValidEmail, isValidPassword } from '../utils/validation';
import { FormErrors } from '../types/FormErrors';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!isValidEmail(email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }

    if (!isValidPassword(password)) {
      newErrors.password = 'パスワードは8文字以上で入力してください';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost/api/login', {
        email,
        password,
      });
      const { access_token, user } = response.data;
      localStorage.setItem('token', access_token);

      // ユーザー情報をストアに設定
      dispatch(fetchUser(access_token));
      dispatch(fetchCustomers(access_token));

      router.push('/customers');
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error('ログインに失敗しました:', error.response);
        alert(`ログインに失敗しました: ${error.response?.data.message}`);
      } else {
        console.error('Error:', error);
        alert('ログインに失敗しました');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-400">
          ログイン
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              メールアドレス
            </label>
            <input
              type="email"
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } text-gray-400`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // required
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              パスワード
            </label>
            <input
              type="password"
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } text-gray-400`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // required
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            ログイン
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          アカウントをお持ちでないですか？{' '}
          <Link href="/register" className="text-blue-500 hover:underline">
            ユーザー登録
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
