'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="text-gray-600 hover:text-blue-500 focus:outline-none"
    >
      ログアウト
    </button>
  );
};

export default LogoutButton;
