'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { Customer } from '@/interfaces/Customer';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { isValidEmail, isNotEmpty, isValidPhone } from '@/app/utils/validation';
import { FormErrors } from '@/app/types/FormErrors';
import { FaArrowLeft } from 'react-icons/fa';

const EditCustomerPage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    const fetchCustomer = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await axios.get<Customer>(
          `http://localhost/api/customers/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const customer = response.data;
        setName(customer.name);
        setEmail(customer.email);
        setPhone(customer.phone);
        setCompany(customer.company);
        setAddress(customer.address);
      } catch (error: any) {
        console.error(error);
        alert('データの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id, router]);

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
      await axios.put(
        `http://localhost/api/customers/${id}`,
        { name, email, phone, company, address },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push('/customers');
    } catch (error: any) {
      console.error(error);
      alert(
        axios.isAxiosError(error)
          ? `顧客の更新に失敗しました: ${error.response?.data.message}`
          : '顧客の更新に失敗しました'
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
      <h1 className="mb-4 text-2xl font-bold text-gray-700">顧客情報の編集</h1>
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
            required
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
            required
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
          更新
        </button>
      </form>
    </div>
  );
};

export default EditCustomerPage;
