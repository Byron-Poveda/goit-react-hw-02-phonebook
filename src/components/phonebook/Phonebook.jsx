import React, { useState, useEffect } from 'react';
import ContactForm from './contactForm/ContactForm';
import Filter from 'components/filter/Filter';
import ContactList from './contactList/ContactList';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, searchContact } from 'redux/phonebookSlice';
const DivPhonebook = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  padding: 15px;
`;
const Phonebook = () => {
  const phonebook = useSelector((state) => state.phonebook.contacts)
  // state.phonebook.contacts pq hay 2 estados el contacts y el originalContacts
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = useState(false); // Nuevo estado para verificar si el componente está montado

  useEffect(() => {
    newLocalStorage()
    // eslint-disable-next-line
  }, [phonebook]);

  const newLocalStorage = () =>{
    if (isMounted) {
      // Evitar que el useEffect se ejecute al recargar la página
      localStorage.setItem('phonebook', JSON.stringify(phonebook));
    }
  }
  useEffect(() => {
    handlePhonebook()
      // eslint-disable-next-line
  }, []);
  const handlePhonebook = () =>{
    setIsMounted(true); // Establecer isMounted en true una vez que el componente se ha montado
    const localContactList =
      JSON.parse(localStorage.getItem('phonebook')) || [];
      if(localContactList.length > 0)return dispatch(addContact(localContactList))
  }
  const filterFunction = (value)=>{dispatch(searchContact(value))}
  return (
    <DivPhonebook>
      <h1>Phonebook</h1>
      <ContactForm />
      <h1>Contacts</h1>
      <Filter  onChange={filterFunction}/>
      <ContactList />
    </DivPhonebook>
  );
};

export default Phonebook;
