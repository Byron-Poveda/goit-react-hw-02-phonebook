import React from 'react';
import Contacs from '../contacts/Contacts';
import Button from 'components/button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/phonebookSlice';
const ContactList = () => {
  const dispatch = useDispatch()
  const phonebook = useSelector((state) => state.phonebook.contacts)
  const filter = useSelector((state) => state.phonebook.filter)
  return (
    <ul>
      {phonebook.map(contact => (
        contact.name.toLowerCase().includes(filter.toLowerCase()) ? <li key={contact?.id || ''}>
        <Contacs
          name={contact?.name || ''}
          number={parseInt(contact?.number || '')}
          id={contact?.id || ''}
          deleteContact={deleteContact}
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
  );
};

export default ContactList;
