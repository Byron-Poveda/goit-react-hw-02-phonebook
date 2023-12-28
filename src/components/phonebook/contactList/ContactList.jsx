import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContact } from 'redux/thunks';
import Loader from 'components/Loader/Loader';
import Contact from '../Contact/Contact';
const ContactList = () => {
  const dispatch = useDispatch()
  const contactList = useSelector((state) => state.phonebook.contacts)
  const filter = useSelector((state) => state.phonebook.filter)
  const loader = useSelector((state) => state.phonebook.isLoading)

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const contactsLength = []
  contactList.map(contact => (
        contact.name.toLowerCase().includes(filter.toLowerCase())) 
        ? contactsLength.push(contact) : '' 
    )
  return (
    <>
    {
      loader ? <Loader variant='circle' fill='#000'/> : 
      <div className='flex flex-col gap-[20px]'>
        <div className='flex items-center gap-[5px]'>  
          <span className='text-[18px] font-bold'>Contactos encontrados:</span>
          <span className='font-rubik text-[22px] font-bold'>{contactsLength.length}</span>
        </div>
        <ul className='p-[5px] flex flex-col gap-[10px] max-h-[40vh] overflow-y-auto overflow-x-hidden'>
          {contactList.map((contact) => (
            contact.name.toLowerCase().includes(filter.toLowerCase()) ? 
            <li key={contact.id}>
              <Contact contact={contact} />
            </li> : ''
          ))}
        </ul>
      </div>
    }
    </>
  );
};

export default ContactList;
