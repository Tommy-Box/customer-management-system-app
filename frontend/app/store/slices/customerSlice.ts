import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Customer } from '@/interfaces/Customer';

interface CustomerState {
  customers: Customer[];
  loading: boolean;
  error: string | null;
}

const initialState: CustomerState = {
  customers: [],
  loading: false,
  error: null,
};

// 非同期アクションの作成
export const fetchCustomers = createAsyncThunk<Customer[], string>(
  'customers/fetchCustomers',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get<Customer[]>(
        'http://localhost/api/customers',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || '顧客情報の取得に失敗しました'
      );
    }
  }
);

export const deleteCustomer = createAsyncThunk<
  number,
  { id: number; token: string }
>('customers/deleteCustomer', async ({ id, token }, { rejectWithValue }) => {
  try {
    await axios.delete(`http://localhost/api/customers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || '顧客の削除に失敗しました'
    );
  }
});

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCustomers.fulfilled,
        (state, action: PayloadAction<Customer[]>) => {
          state.loading = false;
          state.customers = action.payload;
        }
      )
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        deleteCustomer.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.customers = state.customers.filter(
            (customer) => customer.id !== action.payload
          );
        }
      )
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default customerSlice.reducer;
