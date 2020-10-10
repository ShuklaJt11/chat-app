import React, {useState} from 'react'
import {useConversations} from '../contexts/ConversationsProvider'

export default function ConversationList() {
  const {conversations, selectConversation} = useConversations()

  return (
    <ul className="sidebar-list">
      {conversations.map((conversation, index) => (
        <li 
          className={`sidebar-list-item ${conversation.selected && 'active'}`} 
          onClick={() => selectConversation(index)} 
          key={index}
        >
          {conversation.recipients.map(recipient => recipient.name).join(', ')}
        </li>
      ))}
    </ul>
  )
}
