import React, { useState } from 'react';
import Link from 'next/link';
import { Customer } from '@/interfaces/Customer';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { FaTrash, FaEdit } from 'react-icons/fa';

interface CustomerRowProps {
  customer: Customer;
  onDelete: (id: number) => Promise<void>;
}

const CustomerRow: React.FC<CustomerRowProps> = React.memo(
  ({ customer, onDelete }) => {
    const [loading, setLoading] = useState<boolean>(false);

    const handleDelete = async () => {
      setLoading(true); // ローディング開始
      try {
        await onDelete(customer.id); // 非同期削除アクションの呼び出し
      } catch (error) {
        // エラーハンドリングは親コンポーネントで行うため、ここでは再度エラーを投げる
        throw error;
      } finally {
        setLoading(false); // ローディング終了
      }
    };

    return (
      <tr className="border-t">
        <td className="px-4 py-2">{customer.name}</td>
        <td className="px-4 py-2">{customer.email}</td>
        <td className="px-4 py-2">{customer.phone}</td>
        <td className="px-4 py-2">{customer.company}</td>
        <td className="px-4 py-2">{customer.address}</td>
        <td className="px-4 py-2 flex space-x-2">
          <Link href={`/customers/${customer.id}/edit`}>
            <button className="flex items-center px-2 py-1 font-semibold text-white bg-yellow-500 rounded hover:bg-yellow-600">
              <FaEdit className="mr-1" /> 編集
            </button>
          </Link>

          <button
            onClick={handleDelete}
            className={`flex items-center px-2 py-1 font-semibold text-white bg-red-500 rounded hover:bg-red-600 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? (
              <LoadingSpinner size="small" />
            ) : (
              <>
                <FaTrash className="mr-1" /> 削除
              </>
            )}
          </button>
        </td>
      </tr>
    );
  }
);

export default CustomerRow;
