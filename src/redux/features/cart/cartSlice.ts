import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '@/types/globalTypes.ts';

interface ICard {
  products: IProduct[];
  total: number;
  delivery: number;
}

const initialState: ICard = {
  products: [],
  total: 0,
  delivery: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const isExist = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (isExist) {
        isExist.quantity = isExist.quantity! + 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }

      // minus total amount price
      state.total += action.payload.price;

      // delivery charge
      state.delivery = Number((state.total * 0.1).toFixed(2));
    },
    removeOne: (state, action: PayloadAction<IProduct>) => {
      const isExist = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (isExist && isExist.quantity! > 1) {
        isExist.quantity = isExist.quantity! - 1;
      }

      // minus total amount price
      state.total -= action.payload.price;

      // delivery charge
      state.delivery = Number((state.total * 0.1).toFixed(2));
    },
    removeFromCard: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );

      // minus total amount price
      state.total -= action.payload.price * action.payload.quantity!;

      // delivery charge
      state.delivery = Number((state.total * 0.1).toFixed(2));
    },
  },
});
export const { addToCart, removeOne, removeFromCard } = cartSlice.actions;

export default cartSlice.reducer;
