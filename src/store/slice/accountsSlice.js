import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../api/const';

const initialState = {
  accounts: [],
  loading: false,
  error: '',
};

export const getAccounts = createAsyncThunk(
  'accounts/get',
  (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().token.token;
      return axios(
        `${API_URL}/accounts`,
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }).then(({ data }) => {
        const accounts = data.payload;
        const error = data.error;
        return { accounts, error };
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createAccount = createAsyncThunk(
  'accounts/create',
  (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().token.token;
      const currentAccounts = getState().accounts.accounts;
      return axios.post(
        `${API_URL}/create-account`,
        {},
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        })
        .then(({ data }) => {
          const accounts = [...currentAccounts, data.payload];
          const error = data.error;
          return { accounts, error };
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {},
  extraReducers: {
    [getAccounts.pending]: state => {
      state.error = '';
      state.loading = true;
    },
    [getAccounts.fulfilled]: (state, action) => {
      state.accounts = action.payload.accounts;
      state.error = action.payload.error;
      state.loading = false;
    },
    [getAccounts.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [createAccount.pending]: state => {
      state.error = '';
      state.loading = true;
    },
    [createAccount.fulfilled]: (state, action) => {
      state.accounts = action.payload.accounts;
      state.error = action.payload.error;
      state.loading = false;
    },
    [createAccount.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export default accountsSlice.reducer;
