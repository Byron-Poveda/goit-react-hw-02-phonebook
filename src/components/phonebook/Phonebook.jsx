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
      contactsFiltered: [],
    };
    this.addContact = this.addContact.bind(this);
    this.handlerFilter = this.handlerFilter.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
  }
  addContact(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;

    // Verificar si el contacto ya existe en la lista
    const contactExists = this.state.contactList.some(
      contact => contact.form.name === name
    );

    if (contactExists) {
      alert(`${name} is already in contacts`);
      form.reset();
      return;
    }
    const newContact = { form: { name, number }, id: nanoid() };

    this.setState(prevState => ({
      form: { name: '', number: '' },
      contactList: [...prevState.contactList, newContact],
      contactsFiltered: [...prevState.contactsFiltered, newContact],
    }));

    form.reset();
  }
  handlerFilter(e) {
    const results = this.state.contactList.filter(contact => {
      return contact.form.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    this.setState({
      contactsFiltered: results,
    });
  }
  deleteContact(id) {
    const results = this.state.contactList.filter(contact => {
      return contact.id !== id;
    });
    this.setState({
      contactList: results,
      contactsFiltered: results,
    });
  }
  contactList() {
    return this.state.contactsFiltered;
  }
  render() {
    return (
      <div className="phonebook">
        <h1>Phonebook</h1>
        <ContactForm submitForm={this.addContact} />
        <h1>Contacts</h1>
        <Filter onChange={this.handlerFilter} />
        <ContactList
          contacts={this.contactList()}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
