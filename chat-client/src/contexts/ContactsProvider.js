import React, {useContext} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ContactsContext = React.createContext()

export function useContacts() {
  return useContext(ContactsContext)
}

export function ContactsProvider({children}) {
  const [contacts, setContacts] = useLocalStorage('contacts', [])

  const createContact = (id, name) => {
    setContacts(prevContacts => [...prevContacts, {
      id: id,
      name: name
    }])
  }

  return (
    <ContactsContext.Provider value={{contacts, createContact}}>
      {children}
    </ContactsContext.Provider>
  )
}
