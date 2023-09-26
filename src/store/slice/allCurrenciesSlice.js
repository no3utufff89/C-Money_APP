import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../api/const';

const initialState = {
  allCurrencies: [],
  loading: false,
  error: null,
};
// Получить список доступных валют
export const getAllCurrencies = createAsyncThunk(
  'allCurrencies/get',
  (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().token.token;
      return axios(
        `${API_URL}/all-currencies`,
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }).then(({ data }) => {
        const allCurrencies = data.payload;
        return { allCurrencies };
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const allCurrenciesSlice = createSlice({
  name: 'allCurrencies',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllCurrencies.pending]: (state) => {
      state.error = '';
      state.loading = true;
    },
    [getAllCurrencies.fulfilled]: (state, action) => {
      state.allCurrencies = action.payload.allCurrencies;
      state.error = action.payload.error;
      state.loading = false;
    },
    [getAllCurrencies.rejected]: (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    },
  },
});

export default allCurrenciesSlice.reducer;
