import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../api/const';

const initialState = {
  userCurrencies: [],
  loading: false,
  error: '',
};
// Возвращает список валютных счетов текущего пользователя.
export const getUserCurrencies = createAsyncThunk(
  'userCurrencies/get',
  (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().token.token;
      return axios(
        `${API_URL}/currencies`,
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }).then(({ data }) => {
        const userCurrencies = Object.values(data.payload);
        return { userCurrencies };
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncExchange = createAsyncThunk(
  'userCurrencies/buy',
  ({ from, to, amount }, { getState }) => {
    const token = getState().token.token;
    const userCurrencies = getState().userCurrencies.userCurrencies;
    return axios.post(
      `${API_URL}/currency-buy`,
      {
        from,
        to,
        amount,
      },
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then(({ data }) => {
        const currencies = data.payload === null ?
          userCurrencies :
          Object.values(data.payload);
        const error = data.error;
        console.log(error);
        return { currencies, error };
      });
  }
);

export const userCurrenciesSlice = createSlice({
  name: 'userCurrencies',
  initialState,
  reducers: {},
  extraReducers: {
    [getUserCurrencies.pending]: (state) => {
      state.error = '';
      state.loading = true;
    },
    [getUserCurrencies.fulfilled]: (state, action) => {
      state.userCurrencies = action.payload.userCurrencies;
      state.error = action.payload.error;
      state.loading = false;
    },
    [getUserCurrencies.rejected]: (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    },
    [asyncExchange.pending]: (state) => {
      state.error = '';
      state.loading = true;
    },
    [asyncExchange.fulfilled]: (state, action) => {
      state.userCurrencies = action.payload.currencies;
      state.error = action.payload.error;
      state.loading = false;
    },
    [asyncExchange.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export default userCurrenciesSlice.reducer;
