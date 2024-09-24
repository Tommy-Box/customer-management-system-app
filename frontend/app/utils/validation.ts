export const isValidEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 8;
};

export const isNotEmpty = (value: string): boolean => {
  return value.trim().length > 0;
};

export const isValidPhone = (phone: string): boolean => {
  // 簡単な電話番号のバリデーション（国際電話番号を含む）
  const re = /^\+?[0-9\s\-()]{7,20}$/;
  return re.test(phone);
};
