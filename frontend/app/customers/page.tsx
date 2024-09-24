'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
}

const CustomerListPage = () => {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost/api/customers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCustomers(response.data);
      } catch (error) {
        console.error(error);
        alert('データの取得に失敗しました');
      }
    };

    fetchCustomers();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm('本当に削除しますか？');
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      await axios.delete(`http://localhost/api/customers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // 削除後、顧客一覧を更新
      setCustomers(customers.filter((customer) => customer.id !== id));
    } catch (error) {
      console.error(error);
      alert('顧客の削除に失敗しました');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-4 text-2xl font-bold text-gray-400">顧客一覧</h1>
        <Link href="/customers/new">
          <button className="px-4 py-2 mb-4 font-semibold text-white bg-green-500 rounded hover:bg-green-600">
            新規顧客を追加
          </button>
        </Link>
        <table className="w-full bg-white border border-gray-200 rounded">
          <thead>
            <tr className="bg-gray-100 text-gray-400">
              <th className="px-4 py-2 text-left">名前</th>
              <th className="px-4 py-2 text-left">メールアドレス</th>
              <th className="px-4 py-2 text-left">電話番号</th>
              <th className="px-4 py-2 text-left">会社名</th>
              <th className="px-4 py-2 text-left">住所</th>
              <th className="px-4 py-2 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-t text-gray-400">
                <td className="px-4 py-2">{customer.name}</td>
                <td className="px-4 py-2">{customer.email}</td>
                <td className="px-4 py-2">{customer.phone}</td>
                <td className="px-4 py-2">{customer.company}</td>
                <td className="px-4 py-2">{customer.address}</td>
                <td className="px-4 py-2">
                  <Link href={`/customers/${customer.id}/edit`}>
                    <button className="px-2 py-1 font-semibold text-white bg-yellow-500 rounded hover:bg-yellow-600">
                      編集
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(customer.id)}
                    className="px-2 py-1 ml-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    削除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerListPage;
