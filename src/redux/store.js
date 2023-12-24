import { configureStore } from "@reduxjs/toolkit";
import phonebookSlice from "./phonebookSlice.js"
import authSlice from "./authSlice.js"

export const store = configureStore({
  reducer: {
    phonebook: phonebookSlice,
    auth: authSlice,
  },
});