'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const RegisterPage = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // フロントエンドでのバリデーション
    if (password.length < 8) {
      alert('パスワードは8文字以上で入力してください');
      return;
    }

    try {
      const response = await axios.post('http://localhost/api/register', {
        name,
        email,
        password,
      });

      localStorage.setItem('token', response.data.access_token);

      router.push('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error response:', error.response);
        alert(`ユーザー登録に失敗しました: ${error.response?.data.message}`);
      } else {
        console.error('Error:', error);
        alert('ユーザー登録に失敗しました');
      }
    }
  };

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
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 text-gray-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              メールアドレス
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 text-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              パスワード
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 text-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
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
          <a href="/login" className="text-blue-500 hover:underline">
            ログイン
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
