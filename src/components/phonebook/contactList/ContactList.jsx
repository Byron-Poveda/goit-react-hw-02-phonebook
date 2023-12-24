import React, { useEffect } from 'react';
import Contacs from '../contacts/Contacts';
import Button from 'components/button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContact } from 'redux/thunks';
const ContactList = () => {
  const dispatch = useDispatch()
  const contactList = useSelector((state) => state.phonebook.contacts)
  const filter = useSelector((state) => state.phonebook.filter)
  const loader = useSelector((state) => state.phonebook.isLoading)

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    console.log("loader:", loader)
  }, [loader]);

  const contactsLength = []
  contactList.map(contact => (
        contact.name.toLowerCase().includes(filter.toLowerCase())) 
        ? contactsLength.push(contact) : '' 
    )
  return (
    <>
    {
      loader ? <h1>Loading...</h1> : 
      <>
      <div>Contactos encontrados: <span>{contactsLength.length}</span></div>
      <ul>
        {contactList.map(contact => (
          contact.name.toLowerCase().includes(filter.toLowerCase()) ? <li key={contact?.id || ''}>
          <Contacs
            name={contact?.name || ''}
            number={contact?.phone || ''}
          />
          <Button
            type={'button'}
            text={'Delete'}
            onClick={() => {
              dispatch(deleteContact(contact?.id || ''));
            }}
          />
        </li> : ''
        ))}
      </ul>
      </>
    }
    </>
  );
};

export default ContactList;
