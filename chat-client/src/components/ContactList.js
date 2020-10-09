import React, {useState} from 'react'
import {useContacts} from '../contexts/ContactsProvider'

export default function ContactList() {
  const [activeContact, setActiveContact] = useState('')
  const {contacts} = useContacts()

  return (
    <ul className="sidebar-list">
      {contacts.map(contact => (
        <li 
          className={`sidebar-list-item ${activeContact === contact.id && 'active'}`} 
          onClick={() => setActiveContact(contact.id)} 
          key={contact.id}
        >
          {contact.name}
        </li>
      ))}
    </ul>
  )
}
