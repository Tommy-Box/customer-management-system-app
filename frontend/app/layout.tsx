import './globals.css';
import React from 'react';
import type { Metadata } from 'next';
import Header from './components/Header';

export const metadata: Metadata = {
  title: '顧客管理システム',
  description: '顧客管理システムのデモアプリケーション',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="bg-gray-100">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
