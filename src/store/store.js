import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './slice/tokenSlice';
import accountsReducer from './slice/accountsSlice';
import accountReducer from './slice/accountSlice';
import allCurrenciesReducer from './slice/allCurrenciesSlice';
import userCurrenciesReducer from './slice/userCurrenciesSlice';


export const store = configureStore({
  reducer: {
    token: tokenReducer,
    accounts: accountsReducer,
    account: accountReducer,
    currencies: allCurrenciesReducer,
    userCurrencies: userCurrenciesReducer,
  },
  middleware: (getDefaultMiddleware =>
    getDefaultMiddleware())
});
