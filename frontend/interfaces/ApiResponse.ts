import { User } from './User';
import { Customer } from './Customer';

export interface RegisterResponse {
  message: string;
  access_token: string;
  token_type: string;
}

export interface UserResponse {
  data: User[];
}

export interface CustomersResponse {
  data: Customer[];
}
