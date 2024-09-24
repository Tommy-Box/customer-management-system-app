'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const NewCustomerPage = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      await axios.post(
        'http://localhost/api/customers',
        {
          name,
          email,
          phone,
          company,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push('/customers');
    } catch (error) {
      console.error(error);
      alert('顧客の作成に失敗しました');
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-4 text-2xl font-bold text-gray-400">新規顧客の作成</h1>
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
            電話番号
          </label>
          <input
            type="tel"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 text-gray-400"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            会社名
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 text-gray-400"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            住所
          </label>
          <textarea
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 text-gray-400"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          作成
        </button>
      </form>
    </div>
  );
};

export default NewCustomerPage;
