'use client';

import React, { useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchCustomers, deleteCustomer } from '../store/slices/customerSlice';
import { fetchUser, logout } from '../store/slices/userSlice';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import CustomerRow from '@/app/components/CustomerRow';

const CustomersPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, loading: userLoading } = useAppSelector((state) => state.user);
  const {
    customers,
    loading: customersLoading,
    error,
  } = useAppSelector((state) => state.customers);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
      router.push('/login');
      return;
    }

    dispatch(fetchUser(token));
    dispatch(fetchCustomers(token));
  }, [dispatch, router]);

  const handleDelete = useCallback(
    async (id: number) => {
      const confirmDelete = confirm('本当に削除しますか？');
      if (!confirmDelete) return;

      const token = localStorage.getItem('token');
      if (!token) {
        dispatch(logout());
        router.push('/login');
        return;
      }

      try {
        await dispatch(deleteCustomer({ id, token })).unwrap();
        // 成功時のフィードバック（オプション）
        alert('顧客が正常に削除されました');
      } catch (error: any) {
        console.error('削除エラー:', error);
        alert(error.message || '顧客の削除に失敗しました');
      }
    },
    [dispatch, router]
  );

  if (userLoading || customersLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">
        データの取得に失敗しました。
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-4 text-2xl font-bold text-gray-700">顧客一覧</h1>
        <Link href="/customers/new">
          <button className="px-4 py-2 mb-4 font-semibold text-white bg-green-500 rounded hover:bg-green-600">
            新規顧客を追加
          </button>
        </Link>
        <table className="w-full table-auto text-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-2">名前</th>
              <th className="px-4 py-2">メールアドレス</th>
              <th className="px-4 py-2">電話番号</th>
              <th className="px-4 py-2">会社名</th>
              <th className="px-4 py-2">住所</th>
              <th className="px-4 py-2">アクション</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <CustomerRow
                key={customer.id}
                customer={customer}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersPage;
