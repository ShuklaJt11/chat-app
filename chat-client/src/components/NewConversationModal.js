import React, {useState} from 'react'
import {useContacts} from '../contexts/ContactsProvider'
import {useConversations} from '../contexts/ConversationsProvider'

export default function NewConversationModal({closeModal}) {
  const [selectedContacts, setSelectedContacts] = useState([])
  const {contacts} = useContacts()
  const {createConversation} = useConversations()
  
  const handleSubmit = e => {
    e.preventDefault()
    createConversation(selectedContacts)
    closeModal()
  }

  const handleCheckboxChange = contactId => {
    setSelectedContacts(prevSelectedContacts => {
      if (prevSelectedContacts.includes(contactId)) {
        return prevSelectedContacts.filter(prevId => (contactId !== prevId))
      } else {
        return [...prevSelectedContacts, contactId]
      }
    })
  }

  return (
    <div>
      <div className='modal-head'>
        <button className='primary-btn modal-close-btn' onClick={closeModal}>&times;</button>
        <div className="modal-heading">
          <h2>Start a New Conversation</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit} >
        <div className="modal-content">
          {contacts.map(contact => (
            <>
              <input 
                type="checkbox"
                name={contact.id}
                onChange={() => handleCheckboxChange(contact.id)}
                checked={selectedContacts.includes(contact.id)} 
              /> {contact.name} <br />
            </>
          ))}
        </div>
        <div className="modal-action">
          <button className="secondary-btn">Create</button>
        </div>
      </form>
    </div>
  )
}
