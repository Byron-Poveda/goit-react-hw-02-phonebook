import React from 'react';
import ContactForm from '../../components/phonebook/contactForm/ContactForm';
import Filter from 'components/filter/Filter';
import ContactList from '../../components/phonebook/contactList/ContactList';
import { useDispatch } from 'react-redux';
import { searchContact } from 'redux/phonebookSlice';

const Phonebook = () => {
  const dispatch = useDispatch()
  const filterFunction = (value)=>{dispatch(searchContact(value))}
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <h1>Contacts</h1>
      <Filter  onChange={filterFunction}/>
      <ContactList />
    </div>
  );
};

export default Phonebook;
