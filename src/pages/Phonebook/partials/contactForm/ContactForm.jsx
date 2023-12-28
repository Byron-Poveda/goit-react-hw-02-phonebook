import React, { useState } from 'react';
import Input from 'components/input/Input';
import Button from 'components/button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/thunks';
import { Notify } from 'notiflix';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { useDeviceDetect } from 'hooks/deviceDetect/useDeviceDetect';


const ContactForm = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const { isMobile } = useDeviceDetect()

  const dispatch = useDispatch();
  const listContacts = useSelector((state) => state.phonebook.contacts)

  const handleSubmit = e => {
    e.preventDefault();

    const contactExists = () => {
      return  listContacts?.some(
        c => c.name.toLowerCase() === name.toLowerCase()
      );
    }
    if(contactExists()){
      Notify.warning(`El contacto ${name} ya fue agregado`);
      return
    }

    dispatch(addContact({name, number: phone}))
    setName('')
    setPhone('')
  };
  return (
    <form className="flex flex-col gap-[20px]" onSubmit={handleSubmit}>
      <Input
        type={'text'}
        name={'name'}
        modelValue={name}
        onChange={(e)=>setName(e.target.value)}
        autoComplete={'off'}
        required
        variant={isMobile ? '' :'white'}
        placeholder={'Name'}
        title={
          "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        }
      >
        <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
      </Input>
      <Input
        type={'number'}
        name={'phone'}
        variant={isMobile ? '' :'white'}
        placeholder={'Phone'}
        required
        onChange={(e)=>setPhone(e.target.value)}
        modelValue={phone}
      >
        <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
      </Input>
      <Button type={'submit'} >Add Contact</Button>
    </form>
  );
};


export default ContactForm;
