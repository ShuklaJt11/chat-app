import React, {useContext, useState, useEffect, useCallback} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import {useContacts} from './ContactsProvider'
import {useSocket} from './SocketProvider'

const ConversationsContext = React.createContext()

function arrayEquality(array1, array2) {
  if (array1.length !== array2.length) return false
  
  array1.sort()
  array2.sort()

  return array1.every((element, index) => {
    return element === array2[index]
  })
}

export function useConversations() {
  return useContext(ConversationsContext)
}

export function ConversationsProvider({children, id}) {
  const [selectedConversation, setSelectedConversation] = useState(0)
  const [conversations, setConversations] = useLocalStorage('conversations', [])
  const {contacts} = useContacts()
  const {socket} = useSocket()

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map(recipient => {
      const contact = contacts.find(contact => {
        return contact.id === recipient
      })
      const name = (contact && contact.name) || recipient
      return {
        id: recipient,
        name: name
      }
    })
    const messages = conversation.messages.map(message => {
      const contact = contacts.find(contact => {
        return contact.id === message.sender
      })
      const name = (contact && contact.name) || message.sender
      const fromMe = id === message.sender
      return {...message, senderName: name, fromMe}
    })

    const selected = index === selectedConversation
    
    return {...conversation, messages, recipients, selected}
  })

  const createConversation = (recipients) => {
    setConversations(prevConversations => [...prevConversations, {
      recipients: recipients,
      messages: []
    }])
  }

  const addMessageToConversation = useCallback(({recipients, text, sender}) => {
    setConversations(prevConversations => {
      let madeChange = false
      const newMessage = {
        sender,
        text
      }
      const newConversations = prevConversations.map(conversation => {
        if (arrayEquality(conversation.recipients, recipients)) {
          madeChange = true
          return {
            ...conversation,
            messages: [
              ...conversation.messages,
              newMessage
            ]
          }
        }
        return conversation
      })

      if (madeChange) {
        return newConversations
      } else {
        return [
          ...prevConversations,
          {recipients, messages: [newMessage]}
        ]
      }
    })
  }, [setConversations])

  useEffect(() => {
    if (socket == null) return
    socket.on('receive-message', addMessageToConversation)
    return () => socket.off('receive-message')
  }, [socket, addMessageToConversation])

  const sendMessage = (recipients, text) => {
    socket.emit('send-message', {recipients, text})
    addMessageToConversation({recipients, text, sender: id})
  }

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversation],
    selectConversation: setSelectedConversation,
    sendMessage,
    createConversation
  }

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}
