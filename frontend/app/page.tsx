'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-4 text-3xl font-bold text-gray-400">ホームページ</h1>
        <p className="text-gray-400">
          ここにアプリケーションのメインコンテンツを表示します。
        </p>
      </div>
    </div>
  );
};

export default HomePage;
