import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
  originalContacts: [],
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
      state.originalContacts = state.contacts.slice(); // Copia del estado original
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
      state.originalContacts = state.contacts.slice(); // Copia del estado original
    },
    searchContact: (state, action) => {
      if (action.payload) {
        // Aplicar filtro de búsqueda
        state.contacts = state.originalContacts.filter((contact) =>
          contact.name.toLowerCase().includes(action.payload.toLowerCase())
        );
      } else {
        // Restaurar el estado original cuando se borra la búsqueda
        state.contacts = state.originalContacts.slice();
      }
    },
  },
});

export const { addContact, deleteContact, searchContact } = phonebookSlice.actions;

export default phonebookSlice.reducer;
