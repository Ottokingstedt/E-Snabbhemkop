import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
import { productsApi } from './features/productAPI';

import productsReducer, { productsFetch } from './features/productsSlice';
import cartReducer, { getTotals } from './features/cartSlice';
import authSlice, { loadUser } from './features/authSlice';
import ordersReducer from './features/orderSlice';
import usersReducer from './features/usersSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    orders: ordersReducer,
    users: usersReducer,
    cart: cartReducer,
    auth: authSlice,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(productsApi.middleware),
});

store.dispatch(productsFetch());
store.dispatch(getTotals());
store.dispatch(loadUser(null));


const container = document.getElementById('root')
const root = createRoot(container); 

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
