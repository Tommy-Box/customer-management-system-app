'use client';

import React from 'react';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/slices/userSlice';
import { useRouter } from 'next/navigation';

const LogoutButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
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
