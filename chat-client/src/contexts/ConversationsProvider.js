import React, {useContext, useState} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import {useContacts} from './ContactsProvider'

const ConversationsContext = React.createContext()

export function useConversations() {
  return useContext(ConversationsContext)
}

export function ConversationsProvider({children}) {
  const [selectedConversation, setSelectedConversation] = useState(0)
  const [conversations, setConversations] = useLocalStorage('conversations', [])
  const {contacts} = useContacts()

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map(reciepient => {
      const contact = contacts.find(contact => {
        return contact.id === reciepient
      })
      const name = (contact && contact.name) || reciepient
      return {
        id: reciepient,
        name: name
      }
    })
    const selected = index === selectedConversation
    return {...conversation, recipients, selected}
  })

  const createConversation = (recipients) => {
    setConversations(prevConversations => [...prevConversations, {
      recipients: recipients,
      messages: []
    }])
  }

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversation],
    selectConversation: setSelectedConversation,
    createConversation
  }

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}
