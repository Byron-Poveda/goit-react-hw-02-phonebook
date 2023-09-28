import React from 'react';
import Input from 'components/input/Input';
import Button from 'components/button/Button';
import styled from 'styled-components';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/thunks';
import { Notify } from 'notiflix';
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  & Button {
    width: 100px;
  }
`;
const ContactForm = () => {
  const dispatch = useDispatch();
  const listContacts = useSelector((state) => state.phonebook.contacts)

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const phone = form.elements.phone.value;

    const contactExists = () => {
      return  listContacts?.some(
        c => c.name.toLowerCase() === name.toLowerCase()
      );
    }
    if(contactExists()){
       Notify.warning(`El contacto ${name} ya fue agregado`);
       form.reset();
       return
    }

    dispatch(addContact({name, phone, id: nanoid(), createdAt: new Date()}))
    form.reset();
  };
  return (
    <Form className="form-contact" onSubmit={handleSubmit}>
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
        name={'phone'}
        label={'Phone'}
        placeholder={'Phone'}
      />
      <Button type={'submit'} text={'Add Contact'} />
    </Form>
  );
};


export default ContactForm;
