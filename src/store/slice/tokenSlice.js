import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../api/const';
import { setToken } from '../../api/token';

const initialState = {
  token: '',
  error: null,
};
// getTokenDataAsync получает объект data из формы входа,
// его мы деструктурируем прям сразу, ну сразу епта
export const getTokenDataAsync = createAsyncThunk(
  'token/get',
  ({ login, password }) => axios.post(`${API_URL}/login`, {
    login,
    password,
  })
    .then(({ data }) => {
      const token = data.payload ? data.payload.token : '';
      const error = data.error;
      if (token) setToken(token);
      return { token, error };
    }),
);

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setTokenToState(state, action) {
      state.token = action.payload;
      state.error = '';
    },
    deleteTokenFromState(state) {
      state.token = '';
      state.error = '';
    },
    clearError(state) {
      state.error = '';
    },
  },
  extraReducers: {
    [getTokenDataAsync.pending]: (state) => {
      state.error = '';
    },
    [getTokenDataAsync.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.error = action.payload.error;
    },
    [getTokenDataAsync.rejected]: (state, action) => {
      state.error = action.error;
    },
  },
});
export default tokenSlice.reducer;
export const {
  setTokenToState,
  deleteTokenFromState,
  clearError } = tokenSlice.actions;

