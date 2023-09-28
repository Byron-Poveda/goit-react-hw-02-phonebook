import { createAsyncThunk } from "@reduxjs/toolkit";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const baseUrl = "https://65145defdc3282a6a3cd104f.mockapi.io/api/phonebook";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${baseUrl}/contacts`)
      return  response.json()
    } catch (e) {
      Notify.failure('Error al treaer los contactos');
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(
        `${baseUrl}/contacts/${id}`, {
            method: 'DELETE',
          }
          )
          Notify.success('Contacto Eliminado');  
          return  response.json()
        } catch (e) {
          Notify.failure('Error al tratar de eliminar un contacto'); 
          return thunkAPI.rejectWithValue(e.message)
    }
  }
  )

  export const addContact = createAsyncThunk(
    "contacts/addContact",
    async (contact, thunkAPI) => {
      try {
        const response = await fetch(
          `${baseUrl}/contacts`, {
              method: 'POST',
              headers: {'content-type':'application/json'},
              body: JSON.stringify(contact)
          }
        )
          Notify.success('Contacto Agregado con exito');  
          return  response.json()
        } catch (e) {
          Notify.failure('Error al tratar de agregar un contacto'); 
          return thunkAPI.rejectWithValue(e.message)
      }
    }
    )