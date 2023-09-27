import { configureStore } from "@reduxjs/toolkit";
import phonebookSlice from "./phonebookSlice.js"

export const store = configureStore({
  reducer: {
    phonebook: phonebookSlice,
  },
});