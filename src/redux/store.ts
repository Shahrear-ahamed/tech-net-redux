import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/redux/features/cart/cartSlice.ts';
import productReducer from '@/redux/features/products/productSlice.ts';
import { api } from '@/redux/api/apiSlice.ts';
import userReducer from './features/user/userSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
