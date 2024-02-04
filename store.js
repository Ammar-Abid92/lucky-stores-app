import { configureStore } from '@reduxjs/toolkit'
import basketSlice from './slices/basketSlice'
import categorySlice from './slices/categorySlice'

export const store = configureStore({
  reducer: {
    basket: basketSlice,
    category: categorySlice
  },
})