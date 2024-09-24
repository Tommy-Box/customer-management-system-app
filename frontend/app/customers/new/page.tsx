'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Customer } from '@/interfaces/Customer';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { isValidEmail, isNotEmpty, isValidPhone } from '@/app/utils/validation';
import { FormErrors } from '@/app/types/FormErrors';
import { FaArrowLeft } from 'react-icons/fa';

const NewCustomerPage: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [address, setAddress] = useState<string>('');
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

    if (phone && !isValidPhone(phone)) {
      newErrors.phone = '有効な電話番号を入力してください';
    }

    if (company && !isNotEmpty(company)) {
      newErrors.company = '会社名を入力してください';
    }

    if (address && !isNotEmpty(address)) {
      newErrors.address = '住所を入力してください';
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

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const response = await axios.post<Customer>(
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
      console.log('新規顧客作成成功:', response.data);
      router.push('/customers');
    } catch (error: any) {
      console.error('顧客の作成に失敗しました:', error);
      alert(
        axios.isAxiosError(error)
          ? `顧客の作成に失敗しました: ${error.response?.data.message}`
          : '顧客の作成に失敗しました'
      );
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
    <div className="container px-4 py-8 mx-auto">
      <button
        className="mb-4 text-gray-500 hover:text-gray-700 flex items-center"
        onClick={() => router.push('/customers')}
      >
        <FaArrowLeft className="mr-2" />
        顧客一覧に戻る
      </button>
      <h1 className="mb-4 text-2xl font-bold text-gray-700">新規顧客の作成</h1>
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
            電話番号
          </label>
          <input
            type="tel"
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            } text-gray-400`}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            会社名
          </label>
          <input
            type="text"
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 ${
              errors.company ? 'border-red-500' : 'border-gray-300'
            } text-gray-400`}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          {errors.company && (
            <p className="mt-1 text-sm text-red-500">{errors.company}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            住所
          </label>
          <textarea
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            } text-gray-400`}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-500">{errors.address}</p>
          )}
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
