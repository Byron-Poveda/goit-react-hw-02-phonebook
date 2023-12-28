import { createAsyncThunk } from "@reduxjs/toolkit";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from "axios";

// const baseUrlContacts = "https://65145defdc3282a6a3cd104f.mockapi.io/api/phonebook";
const baseUrlContacts = "https://connections-api.herokuapp.com";
const baseUrlAuth = "https://connections-api.herokuapp.com/users";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token
      const response = await axios.get(`${baseUrlContacts}/contacts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return  response.data
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
      const token = thunkAPI.getState().auth.token
      const response = await axios.delete(
        `${baseUrlContacts}/contacts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          Notify.success('Contacto Eliminado');  
          return  response.data
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
      const token = thunkAPI.getState().auth.token;
      const response = await axios.post(
        `${baseUrlContacts}/contacts`, contact,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
        Notify.success('Contacto Agregado con exito');  
        return  response.data
      } catch (e) {
        Notify.failure('Error al tratar de agregar un contacto'); 
        return thunkAPI.rejectWithValue(e.message)
    }
  }
  )
  
  // auth

  const fecthCurrentUser = async token => {
    try {
      const response = await axios.get(`${baseUrlAuth}/current`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data;
      
    } catch (e) {
      return Notify.failure(e, {
        backOverlay: true,
        fontSize: '16px',
        fontFamily: 'Verdana',
        cssAnimationStyle: 'from-right',
        timeout: 800,
      });
    }
  };

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userInfo, thunkAPI) => {
    try {
      const { email, password } = userInfo;

      if (!email || !password) {
        return thunkAPI.rejectWithValue('Los campos son requeridos');
      }

      const response = await axios.post(`${baseUrlAuth}/login`, userInfo);

      const token = response.data.token;

      const currentUser = await fecthCurrentUser(token);

      localStorage.setItem('userCurrent', JSON.stringify(currentUser));

      return {
        token,
        currentUser,
        userData: response.data.User,
      };
    } catch (e) {
      return thunkAPI.rejectWithValue('Email or password incorret');
    }
  }
);

export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async (data, thunkAPI) => {
    try {

      const { name, email, password } = data;

      if (!name || !email || !password) {
        return thunkAPI.rejectWithValue('Los campos son requeridos');
      }

      const response = await axios.post(`${baseUrlAuth}/signup`, data);

      console.log(response.status)

      if (response.status !== 201) {
        return thunkAPI.rejectWithValue('Error en SignUp');
      }

      return {
        token: response.data.token,
        currentUser: response.data.user,
      };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data?.errors?.password?.message || 'Email un Use!');
    }
  }
);

export const logOutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      await axios.post(`${baseUrlAuth}/logout`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem('token');
      localStorage.removeItem('userCurrent');

      return '';
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);