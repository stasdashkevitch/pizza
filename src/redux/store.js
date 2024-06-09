import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice'
import cart from './slices/cartSlice'
import pizza from './slices/PizzaSlice' 
// импортирование по дефолту позволяет называть как угодно импортируемый объект
export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza
  },
})
