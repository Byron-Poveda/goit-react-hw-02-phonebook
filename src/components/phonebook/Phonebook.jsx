import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './contactForm/ContactForm';
import Filter from 'components/filter/Filter';
import ContactList from './contactList/ContactList';
import styled from 'styled-components';
const DivPhonebook = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  padding: 15px;
`;
const Phonebook = () => {
  const [contactList, setContactList] = useState([]);
  const [filter, setFilter] = useState('');
  const [isMounted, setIsMounted] = useState(false); // Nuevo estado para verificar si el componente está montado

  useEffect(() => {
    if (isMounted) {
      // Evitar que el useEffect se ejecute al recargar la página
      localStorage.setItem('phonebook', JSON.stringify(contactList));
      console.log('update', localStorage.getItem('phonebook'));
    }
  }, [contactList, isMounted]);

  useEffect(() => {
    setIsMounted(true); // Establecer isMounted en true una vez que el componente se ha montado
    const localContactList =
      JSON.parse(localStorage.getItem('phonebook')) || [];
    setContactList(localContactList);
  }, []);
  const addContact = (name, number) => {
    // Verificar si el contacto ya existe en la lista
    const contactExists = contactList.some(contact => contact.name === name);

    if (contactExists) {
      alert(`${name} is already in contacts`);
      return;
    }
    const newContact = { name, number, id: nanoid() };
    setContactList(prevContactList => [...prevContactList, newContact]);
  };
  const handleFilterValue = e => {
    setFilter(e.target.value);
  };
  const deleteContact = id => {
    const results = contactList.filter(contact => {
      return contact.id !== id;
    });
    setContactList(results);
  };
  const filteredContacts = contactList.filter(contact => {
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });
  return (
    <DivPhonebook>
      <h1>Phonebook</h1>
      <ContactForm submitForm={addContact} />
      <h1>Contacts</h1>
      <Filter onChange={handleFilterValue} />
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
    </DivPhonebook>
  );
};

export default Phonebook;
