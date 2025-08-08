import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

interface CartState {
  products: Product[];
  total: number;
}

const initialState: CartState = {
  products: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.products.find(
        (product) => product.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }

      state.total = state.products.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
      );
    },

    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );

      state.total = state.products.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
      );
    },

    clearCart: (state) => {
      state.products = [];
      state.total = 0;
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const product = state.products.find((p) => p.id === action.payload.id);
      if (product) {
        product.quantity = action.payload.quantity;
        state.total = state.products.reduce(
          (sum, product) => sum + product.price * product.quantity,
          0
        );
      }
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart, updateQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
