import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Importa el tipo de almacenamiento que deseas utilizar (localStorage en este caso)
import phonebookSlice from "./phonebookSlice.js"

const persistConfig = {
  key: "phonebook", // Puedes cambiar esto a un nombre único para tu aplicación
  storage, // El tipo de almacenamiento (localStorage en este caso)
  // Puedes agregar configuraciones adicionales aquí si es necesario
};

const persistedReducer = persistReducer(persistConfig, phonebookSlice);

export const store = configureStore({
  reducer: {
    phonebook: persistedReducer, // Usa el reducer con persistencia
  },
});

export const persistor = persistStore(store); // Crea el persistor
