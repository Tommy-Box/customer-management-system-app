import './globals.css';
import React from 'react';
import type { Metadata } from 'next';
import Header from './components/Header';
import store from './store';
import ProviderWrapper from './components/ProviderWrapper';

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
        <ProviderWrapper>
          <Header />
          <main>{children}</main>
        </ProviderWrapper>
      </body>
    </html>
  );
}
