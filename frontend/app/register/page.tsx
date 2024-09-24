'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAppDispatch } from '../store/hooks';
import { setUser } from '../store/slices/userSlice';
import { fetchCustomers } from '../store/slices/customerSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import { isValidEmail, isValidPassword, isNotEmpty } from '../utils/validation';
import { FormErrors } from '../types/FormErrors';

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!isNotEmpty(name)) {
      newErrors.name = '名前を入力してください';
    }

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
      const response = await axios.post('http://localhost/api/register', {
        name,
        email,
        password,
      });

      const { access_token, user } = response.data;

      // トークンを保存
      localStorage.setItem('token', access_token);

      // ストアにユーザー情報を設定
      dispatch(setUser(user));

      // 顧客情報を取得
      dispatch(fetchCustomers(access_token));

      // ホームページにリダイレクト
      router.push('/');
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error('Error response:', error.response);
        alert(`ユーザー登録に失敗しました: ${error.response?.data.message}`);
      } else {
        console.error('Error:', error);
        alert('ユーザー登録に失敗しました');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-400">
          ユーザー登録
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              名前
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } text-gray-400`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              // required
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>
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
              minLength={8}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-green-500 rounded hover:bg-green-600"
          >
            登録
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          既にアカウントをお持ちですか？{' '}
          <Link href="/login" className="text-blue-500 hover:underline">
            ログイン
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
