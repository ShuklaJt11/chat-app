import React, {useRef} from 'react'
import {useContacts} from '../contexts/ContactsProvider'

export default function NewContactModal({closeModal}) {
  const idRef = useRef()
  const nameRef = useRef()
  const {createContact} = useContacts()

  const handleSubmit = e => {
    e.preventDefault()
    createContact(idRef.current.value, nameRef.current.value)
    closeModal()
  }

  return (
    <div>
      <div className='modal-head'>
        <button className='primary-btn modal-close-btn' onClick={closeModal}>&times;</button>
        <div className="modal-heading">
          <h2>Add a New Contact</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit} >
        <div className="modal-content">
          Id: <input ref={idRef} type="text" />
          Name: <input ref={nameRef} type="text" />
        </div>
        <div className="modal-action">
          <button className="secondary-btn">Create</button>
        </div>
      </form>
    </div>
  )
}
