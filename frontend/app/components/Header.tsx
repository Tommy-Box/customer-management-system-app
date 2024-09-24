'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import LogoutButton from './LogoutButton';

const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        return;
      }

      try {
        const response = await axios.get('http://localhost/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('ユーザー情報:', response.data);
        setUser(response.data);
      } catch (error) {
        console.error('ユーザー情報の取得に失敗しました', error);
        // トークンが無効な場合はログアウトさせる
        localStorage.removeItem('token');
        setUser(null);
        router.push('/login');
      }
    };

    fetchUser();
  }, []);

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
            {user && (
              <li className="text-gray-600">
                {user.name}さん：
                <LogoutButton />
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
