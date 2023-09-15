import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
  filter: "",
//   para realizar la busqueda
};

export const phonebookSlice = createSlice({
  name: "phonebook",
  initialState,
  reducers: {
    addContact: (state, action) => {
      const contactExists = state.contacts.some(
        (contact) => contact.name.toLowerCase() === action.payload.name.toLowerCase()
      );
      if (contactExists) {
        alert(`${action.payload.name} is already in contacts`);
        return;
      }
      if (Array.isArray(action.payload))
        return action.payload.forEach((contact) =>
          state.contacts.push(contact)
        );
      state.contacts.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
    },
    searchContact: (state, action) => {
      state.filter = action.payload 
    },
  },
});

export const { addContact, deleteContact, searchContact } = phonebookSlice.actions;

export default phonebookSlice.reducer;
