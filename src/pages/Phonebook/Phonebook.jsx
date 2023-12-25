import React, { useState } from 'react';
import ContactForm from '../../components/phonebook/contactForm/ContactForm';
import ContactList from '../../components/phonebook/contactList/ContactList';
import { useDispatch } from 'react-redux';
import { searchContact } from 'redux/phonebookSlice';
import { logOutUser } from 'redux/thunks';
import Input from 'components/input/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Button from 'components/button/Button';

const Phonebook = () => {
  const [filter, setFilter] = useState()

  const dispatch = useDispatch()

  return (
    <div className='flex w-full h-screen justify-center'>
      <div className='w-1/2 px-[35px] pt-[150px] border-r border-black'>
        <h1 className='font-rubik text-[42px] mb-[15px]'>Phonebook</h1>
        <ContactForm />
      </div>
      <div className='w-1/2 px-[35px] pt-[150px]'>
        <h1 className='font-rubik text-[42px] mb-[15px]'>Contacts</h1>
        <Input
          type={'text'}
          name={'filter'}
          modelValue={filter}
          autoComplete={'off'}
          placeholder={'Search Contact'}
          onChange={e => {
            setFilter(e.target.value)
            dispatch(searchContact(e.target.value))
          }}
        >
          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
        </Input>
        <ContactList />
        <Button 
          onClick={()=>dispatch(logOutUser())}
        >
          salir
        </Button>
      </div>
    </div>
  );
};

export default Phonebook;
