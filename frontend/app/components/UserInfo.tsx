import React from 'react';
import { User } from '@/interfaces/User';
import LogoutButton from './LogoutButton';

interface UserInfoProps {
  user: User;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <li className="text-gray-600">
      {user.name}さん：
      <LogoutButton />
    </li>
  );
};

export default React.memo(UserInfo);
