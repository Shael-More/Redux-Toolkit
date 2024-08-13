import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartItems from '../../cartItems';

const url = 'https://www.course-api.com/react-useReducer-cart-project';

const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
  isError: false,
};

// Action
export const getCartItems = createAsyncThunk('cart/getCartItems', async () => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // functionality of components goes in reducers
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      // console.log(action);
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount += 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount -= 1;
    },
    calculateTotal: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });

      state.amount = amount;
      state.total = total;
    },
  },
  // passing extraReducers as a plain javascript object to createSlice()
  // builder callback
  extraReducers: (builder) => {
    builder.addCase(getCartItems.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getCartItems.fulfilled, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    });

    builder.addCase(getCartItems.rejected, (state, action) => {
      state.isLoading = false;
      console.log('Error', action.payload);
      state.isError = true;
    });
  },
});

// console.log(cartSlice);

export const { clearCart, removeItem, increase, decrease, calculateTotal } =
  cartSlice.actions;

export default cartSlice.reducer;
