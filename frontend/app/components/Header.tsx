'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/app/store/hooks';
import UserInfo from './UserInfo';
// import LoadingSpinner from './LoadingSpinner';

const Header = () => {
  const { user, loading } = useAppSelector((state) => state.user);

  if (loading) {
    return (
      <header className="bg-white shadow">
        <div className="container flex items-center justify-between px-4 py-4 mx-auto">
          <h1 className="text-xl font-bold text-gray-700">
            <Link href="/">顧客管理システム</Link>
          </h1>
          <div className="flex items-center">
            {/* ローディングスピナーを表示 */}
            <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow">
      <div className="container flex items-center justify-between px-4 py-4 mx-auto">
        <h1 className="text-xl font-bold text-gray-700">
          <Link href="/">顧客管理システム</Link>
        </h1>
        <nav>
          <ul className="flex items-center space-x-4">
            <li>
              <Link href="/" className="text-gray-600 hover:text-blue-500">
                ホーム
              </Link>
            </li>
            <li>
              <Link
                href="/customers"
                className="text-gray-600 hover:text-blue-500"
              >
                顧客一覧
              </Link>
            </li>
            {!user && (
              <>
                <li>
                  <Link
                    href="/login"
                    className="text-gray-600 hover:text-blue-500"
                  >
                    ログイン
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="text-gray-600 hover:text-blue-500"
                  >
                    ユーザー登録
                  </Link>
                </li>
              </>
            )}
            {user && <UserInfo user={user} />}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
