import React, { useState } from 'react'
import ContactList from 'components/phonebook/contactList/ContactList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Input from 'components/input/Input'
import { searchContact } from 'redux/phonebookSlice';
import { useDispatch } from 'react-redux'
import { useDeviceDetect } from 'hooks/deviceDetect/useDeviceDetect'

const Contacts = () => {
  const [filter, setFilter] = useState('')

  const { isMobile } = useDeviceDetect()

  const dispatch = useDispatch()

  return (
    <div className={`flex flex-col w-full ${isMobile ? 'pt-[100px]' : ''}`}>
      <h1 className='font-rubik text-[42px] mb-[15px]'>Contacts</h1>
      <Input
        type={'text'}
        name={'filter'}
        modelValue={filter}
        autoComplete={'off'}
        placeholder={'Search Contact'}
        classWrapper='mb-[8px]'
        onChange={e => {
          setFilter(e.target.value)
          dispatch(searchContact(e.target.value))
        }}
      >
        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
      </Input>
      <ContactList />
    </div>
  )
}

export default Contacts
