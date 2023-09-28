import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, deleteContact, addContact } from "./thunks";
const initialState = {
  contacts: [],
  isLoading: false,
  error: null,
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
      state.contacts = action.payload.contacts;
    },
    searchContact: (state, action) => {
      state.filter = action.payload 
    },
  },
  extraReducers:{
    [fetchContacts.pending](state) {
      state.isLoading = true
      state.error = null
    },
    [fetchContacts.fulfilled](state, action) {
      state.contacts = action.payload
       state.isLoading = false
    },
    [fetchContacts.rejected](state, action) {
      state.error = action.payload
      state.isLoading = false
    },
    [deleteContact.pending](state) {
      state.isLoading = true
      state.error = null
    },
    [deleteContact.fulfilled](state, action) {
      state.contacts = state.contacts.filter((contact) => contact.id !== action.payload.id)
      state.isLoading = false
    },
    [deleteContact.rejected](state, action) {
      state.error = action.payload
      state.isLoading = false
    },
    [addContact.pending](state) {
      state.isLoading = true
      state.error = null
    },
    [addContact.fulfilled](state, action) {
      state.contacts.push(action.payload)
      state.isLoading = false
    },
    [addContact.rejected](state, action) {
      state.error = action.payload
      state.isLoading = false
    },
  }
});

export const { initLoading, setContacts, searchContact } = phonebookSlice.actions;

export default phonebookSlice.reducer;
