import React from 'react';
import ContactForm from './contactForm/ContactForm';
import Filter from 'components/filter/Filter';
import ContactList from './contactList/ContactList';
import LengthContacts from './lengthContacts/LengthContacts';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { searchContact } from 'redux/phonebookSlice';
const DivPhonebook = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  padding: 15px;
`;
const Phonebook = () => {
  const dispatch = useDispatch()
  const filterFunction = (value)=>{dispatch(searchContact(value))}
  return (
    <DivPhonebook>
      <h1>Phonebook</h1>
      <ContactForm />
      <h1>Contacts</h1>
      <Filter  onChange={filterFunction}/>
      <LengthContacts />
      <ContactList />
    </DivPhonebook>
  );
};

export default Phonebook;
