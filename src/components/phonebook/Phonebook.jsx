import React, { Component } from 'react';
import './phonebook.css';
import { nanoid } from 'nanoid';
import ContactForm from './contactForm/ContactForm';
import Filter from 'components/filter/Filter';
import Button from 'components/button/Button';
import Contacs from './contacts/Contacts';
export default class Phonebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: '',
        number: '',
      },
      contactList: [],
      contactsFiltered: [],
    };
    this.submitForm = this.submitForm.bind(this);
    this.handlerFilter = this.handlerFilter.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
  }
  submitForm(e) {
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
  render() {
    const { contactsFiltered } = this.state;
    return (
      <div className="phonebook">
        <h1>Phonebook</h1>
        <ContactForm submitForm={this.submitForm} />
        <h1>Contacts</h1>
        <Filter onChange={this.handlerFilter} />
        <ul>
          {contactsFiltered.map(contact => (
            <li key={contact.id}>
              <Contacs
                name={contact.form.name}
                number={parseInt(contact.form.number)}
                id={contact.id}
                deleteContact={this.deleteContact}
              />
              <Button
                type={'button'}
                text={'Delete'}
                onClick={() => {
                  this.deleteContact(contact.id);
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
