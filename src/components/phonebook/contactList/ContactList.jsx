import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Contacs from '../contacts/Contacts';
import Button from 'components/button/Button';
export default class ContactList extends Component {
  static propTypes = {
    contacts: PropTypes.array,
    deleteContact: PropTypes.func,
  };
  static defaultProps = {
    contacts: [],
    deleteContact: () => {},
  };

  render() {
    const { contacts, deleteContact } = this.props;
    return (
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            <Contacs
              name={contact.name}
              number={parseInt(contact.number)}
              id={contact.id}
              deleteContact={this.deleteContact}
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
  }
}
