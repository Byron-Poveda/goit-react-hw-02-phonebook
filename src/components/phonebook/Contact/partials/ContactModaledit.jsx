import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ModalBasic from 'components/modals/ModalBasic'
import Input from 'components/input/Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faUser } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { editContact } from 'redux/thunks'
import Button from 'components/button/Button'
import { Notify } from 'notiflix'

function ContactModaledit({setOpenModalEdit, openModalEdit, contact}) {
  const [name, setName] = useState(contact.name)
  const [phone, setPhone] = useState(contact.number)

  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.isLoading);
  const listContacts = useSelector((state) => state.phonebook.contacts)

  const handleSubmit = (e) => {
    e.preventDefault()

    const contactExists = () => {
      return  listContacts?.some(
        c => c.name.toLowerCase() === name.toLowerCase()
      );
    }
    if(contactExists()){
      Notify.warning(`Ya existe un contacto con el nombre: ${name}`);
      return
    }
    dispatch(editContact({id: contact.id, contact: {name, number:phone}}))
    if(!loading) return setOpenModalEdit(false)
  }

  return (
    <ModalBasic
      close={()=>setOpenModalEdit(false)}
      isActive={openModalEdit}
    >
      <div className='flex justify-center items-center flex-col gap-[8px] px-[15px] py-[20px]'>
        <h1 className='font-rubik text-black text-[42px] mb-[15px]'>Edit Contact</h1>
        <form className="flex flex-col gap-[20px]" onSubmit={handleSubmit}>
          <Input
            type={'text'}
            name={'name'}
            modelValue={name}
            onChange={(e)=>setName(e.target.value)}
            autoComplete={'off'}
            required
            placeholder={'Name'}
          >
            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
          </Input>
          <Input
            type={'number'}
            name={'phone'}
            placeholder={'Phone'}
            required
            onChange={(e)=>setPhone(e.target.value)}
            modelValue={phone}
          >
            <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
          </Input>
          <Button type={'submit'} loading={loading} isDisabled={name === contact.name && phone === contact.number}>Update Contact</Button>
        </form>
      </div>
    </ModalBasic>
  )
}

ContactModaledit.propTypes = {
  setOpenModalEdit: PropTypes.func, 
  openModalEdit: PropTypes.bool, 
  contact: PropTypes.object
}

export default ContactModaledit
