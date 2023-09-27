import { initLoading, setContacts } from "./phonebookSlice";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const baseUrl = "https://65145defdc3282a6a3cd104f.mockapi.io/api/phonebook";

export const fetchAll = () => {
  return async (dispatch, getState) => {
    try{dispatch(initLoading(true));

    const res = await fetch(
      `${baseUrl}/contacts`
    )
    
    const data = await res.json();

    dispatch(
        setContacts({
            contacts: data,
            loading: false
      })
    );}catch{
        Notify.failure('Error al treaer los contactos');
    }finally{
        dispatch(initLoading(false))
    }

  };
};

export const deleteContact = (id) => {
    return async (dispatch, getState) => {
      dispatch(initLoading(true));
    
      await fetch(
        `${baseUrl}/contacts/${id}`, {
            method: 'DELETE',
        }
      ).then(()=>{
        return Notify.success('Contacto Eliminado');  // success notification
    }).catch(()=>{
        return Notify.failure('Error al tratar de eliminar un contacto');  // Error notification
    })

      dispatch(fetchAll())
    };
  };

  export const addContact = (contact, listContacts) => {
    return async (dispatch, getState) => {
        const contactExists = listContacts?.some(
            (c) => c.name.toLowerCase() === contact.name.toLowerCase()
        );
        
        if (contactExists) {
            return Notify.warning(`El contacto ${contact.name} ya fue agregado`);
        }
        
        dispatch(initLoading(true));  
        await fetch(
        `${baseUrl}/contacts`, {
            method: 'POST',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(contact)
        }
      ).then(()=>{
            return Notify.success('Contacto agregado');  // success notification
        }).catch(()=>{
            return Notify.failure('Error tratar de agregar un contacto');  // Error notification
        });
      
      dispatch(fetchAll())
    };
  };