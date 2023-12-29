import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, deleteContact, addContact, editContact } from "./thunks";
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
    [editContact.pending](state) {
      state.isLoading = true
      state.error = null
    },
    [editContact.fulfilled](state, action) {
      const editedContact = action.payload;
      const index = state.contacts.findIndex((contact) => contact.id === editedContact.id);
    
      if (index !== -1) {
        state.contacts[index] = editedContact;
      }
    
      state.isLoading = false;
    },
    [editContact.rejected](state, action) {
      state.error = action.payload
      state.isLoading = false
    },
  }
});

export const { /*initLoading, setContacts,*/ searchContact } = phonebookSlice.actions;

export default phonebookSlice.reducer;
