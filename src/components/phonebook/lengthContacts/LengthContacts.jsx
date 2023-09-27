import React from 'react'
import { useSelector } from 'react-redux'

function LengthContacts() {
    const contactsList = useSelector((state)=> state.phonebook.contacts.items)
    const filter = useSelector((state) => state.phonebook.filter)
    const contactsLength = []
    contactsList.map(contact => (
        contact.name.toLowerCase().includes(filter.toLowerCase())) 
        ? contactsLength.push(contact) : '' 
    )
  return (
    <div>Contactos encontrados: <span>{contactsLength.length}</span></div>
  )
}

export default LengthContacts