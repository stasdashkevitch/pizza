import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasById',
  async ({ category, search, page, sortType }) => {
    const { data } = await axios.get(`https://65e227f9a8583365b317f8e3.mockapi.io/items?${page}&limit=4${category}&sortBy=${sortType}&order=desc${search}`);
    return data;
  },
)

const initialState = {
  items: [],
  status: 'loading',
};


const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    })
    .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succes';
    })
    .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error';
        state.items = [];
    })
  },
});

export const selectPizzasItems = state => state.pizza;
export const selectPizzas = id => state => state.cart.items.find(obj => obj.id === id);

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer; 
