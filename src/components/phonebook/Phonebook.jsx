import React, { Component } from 'react';
import './phonebook.css';
import { nanoid } from 'nanoid';
import ContactForm from './contactForm/ContactForm';
import Filter from 'components/filter/Filter';
import ContactList from './contactList/ContactList';
export default class Phonebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactList: [],
      filter: '',
    };
    this.addContact = this.addContact.bind(this);
    this.handleFilterValue = this.handleFilterValue.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
  }
  addContact(name, number) {
    // Verificar si el contacto ya existe en la lista
    const contactExists = this.state.contactList.some(
      contact => contact.name === name
    );

    if (contactExists) {
      alert(`${name} is already in contacts`);
      return;
    }
    const newContact = { name, number, id: nanoid() };

    this.setState(prevState => ({
      name: '',
      number: '',
      contactList: [...prevState.contactList, newContact],
    }));
  }
  handleFilterValue(e) {
    this.setState({
      filter: e.target.value,
    });
  }
  deleteContact(id) {
    const results = this.state.contactList.filter(contact => {
      return contact.id !== id;
    });
    this.setState({
      contactList: results,
    });
  }
  render() {
    const { filter, contactList } = this.state;
    const filteredContacts = contactList.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
    return (
      <div className="phonebook">
        <h1>Phonebook</h1>
        <ContactForm submitForm={this.addContact} />
        <h1>Contacts</h1>
        <Filter onChange={this.handleFilterValue} />
        <ContactList
          contacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
