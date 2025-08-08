import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../index";

// Async action to fetch user data
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();

      // Transform API data to match our User interface
      return {
        id: data.id.toString(),
        firstName: data.name.split(" ")[0],
        lastName: data.name.split(" ")[1] || "",
        email: data.email,
      };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

// Async action to fetch products for cart
export const fetchProducts = createAsyncThunk(
  "cart/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();

      // Transform API data to match our Product interface
      return data.slice(0, 10).map((item: any) => ({
        id: item.id.toString(),
        title: item.title,
        price: Math.floor(Math.random() * 100) + 10,
        quantity: 1,
      }));
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

// Async action to simulate checkout
export const checkoutCart = createAsyncThunk(
  "cart/checkout",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const { cart } = state;

    try {
      // Simulate API call to checkout
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate random success/failure
      if (Math.random() > 0.2) {
        return { success: true, orderId: `ORDER-${Date.now()}` };
      } else {
        throw new Error("Payment failed");
      }
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Checkout failed"
      );
    }
  }
);
