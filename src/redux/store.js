import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./phonebookSlice.js"

export const store = configureStore({
  reducer: {
    phonebook: contactReducer,
  },
});