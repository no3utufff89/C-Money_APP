import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../api/const';

const initialState = {
  account: {},
  loading: false,
  error: '',
};

export const getCurrentAccount = createAsyncThunk(
  'account/get',
  (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().token.token;
      return axios(
        `${API_URL}/account/${id}`,
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        })
        .then(({ data }) => {
          const account = data.payload;
          return { account };
        });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const accountTransfer = createAsyncThunk(
  'account/transfer',
  (data, { getState, rejectWithValue }) => {
    const token = getState().token.token;
    const currentAccount = getState().account.account.account;
    const { to, amount } = data;
    return axios.post(
      `${API_URL}/transfer-funds`,
      {
        from: currentAccount,
        to,
        amount,
      },
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then(({ data }) => {
        const account = data.payload;
        const error = data.error;

        return { account, error };
      });
  }
);

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: {
    [getCurrentAccount.pending]: (state) => {
      state.loading = true;
    },
    [getCurrentAccount.fulfilled]: (state, action) => {
      state.account = action.payload.account;
      state.loading = false;
    },
    [getCurrentAccount.rejected]: (state, action) => {
      state.account = action.error;
      state.loading = false;
    },
    [accountTransfer.pending]: (state) => {
      state.loading = true;
    },
    [accountTransfer.fulfilled]: (state, action) => {
      if (!action.payload.error) {
        state.account = action.payload.account;
      }
      state.error = action.payload.error;
      state.loading = false;
    },
    [accountTransfer.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export default accountSlice.reducer;
