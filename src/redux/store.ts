import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/redux/features/cart/cartSlice.ts';
import productReducer from '@/redux/features/products/productSlice.ts';
import { productsApi } from '@/redux/api/apiSlice.ts';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
