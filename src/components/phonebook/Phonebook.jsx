import React, { Component } from 'react';
import './phonebook.css';
import { nanoid } from 'nanoid';
import Input from 'components/input/Input';
import Button from 'components/button/Button';
import Contacs from './contacts/Contacs';
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
  }
  submitForm(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;
    this.setState({
      form: { name: name, number: number },
      contactList: [
        ...this.state.contactList,
        { form: { name, number }, id: nanoid() },
      ],
      contactsFiltered: [
        ...this.state.contactList,
        { form: { name, number }, id: nanoid() },
      ],
    });
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
  render() {
    const { contactsFiltered } = this.state;
    return (
      <div className="phonebook">
        <h1>Phonebook</h1>
        <form className="form-contact" onSubmit={this.submitForm}>
          <Input
            type={'text'}
            name={'name'}
            label={'Name'}
            autoComplete={'off'}
            placeholder={'Name'}
            title={
              "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            }
            pattern={"^[a-zA-ZА-Я]+(([' -][a-zA-ZА-Я ])?[a-zA-ZА-Я]*)*$"}
          />
          <Input
            type={'number'}
            name={'number'}
            label={'Number'}
            placeholder={'Number'}
            autoComplete={'off'}
          />
          <Button type={'submit'} text={'Add Contact'} />
        </form>
        <Input
          type={'text'}
          name={'filter'}
          label={'Search Contact'}
          autoComplete={'off'}
          placeholder={'Search'}
          onChange={e => {
            this.handlerFilter(e);
          }}
        />
        <ul>
          {contactsFiltered.map(contact => (
            <li key={contact.form.id}>
              <Contacs
                name={contact.form.name}
                number={parseInt(contact.form.number)}
                id={contact.id}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
