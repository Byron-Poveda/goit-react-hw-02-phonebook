import PropTypes from 'prop-types';
import React from 'react';
import Contacs from '../contacts/Contacts';
import Button from 'components/button/Button';
const ContactList = ({ contacts = [], deleteContact = () => {} }) => {
  return (
    <ul>
      {contacts.map(contact => (
        <li key={contact.id}>
          <Contacs
            name={contact.name}
            number={parseInt(contact.number)}
            id={contact.id}
            deleteContact={deleteContact}
          />
          <Button
            type={'button'}
            text={'Delete'}
            onClick={() => {
              deleteContact(contact.id);
            }}
          />
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array,
  deleteContact: PropTypes.func,
};

export default ContactList;
