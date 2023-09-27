import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null
  },
  filter: ""
};

export const phonebookSlice = createSlice({
  name: "phonebook",
  initialState,
  reducers: {
    initLoading:(state, action) => {
      state.isLoading = action.payload
    },
    setContacts: (state, action) => {
      state.contacts.items = action.payload.contacts;
    },
    searchContact: (state, action) => {
      state.filter = action.payload 
    },
  },
});

export const { initLoading, setContacts, searchContact } = phonebookSlice.actions;

export default phonebookSlice.reducer;
