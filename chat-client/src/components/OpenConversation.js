import React, { useState, useCallback } from 'react'
import sendBtn from '../send-button.svg'
import {useConversations} from '../contexts/ConversationsProvider'

export default function OpenConversation() {
  const [text, setText] = useState('')
  const setRef = useCallback(node => {
    if (node) node.scrollIntoView({smooth: true})
  }, [])

  const {sendMessage, selectedConversation} = useConversations()

  const handleSubmit = e => {
    e.preventDefault()
    sendMessage(
      selectedConversation.recipients.map(recipient => recipient.id),
      text
    )
    setText('')
  }

  return (
    <div className="conversation-area">
      <div className="messages-list">
        <div className="messages-wrap">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage = selectedConversation.messages.length - 1 === index
            return (
            <div className="message-wrap" key={index} ref={lastMessage ? setRef : null} >
              <div className={`message ${message.fromMe && 'sent-by-me'}`}>
                {message.text}
              </div>
              <div className={`message-sender ${message.fromMe && 'sent-by-me'}`}>
                {message.fromMe ? 'You' : message.senderName}
              </div>
            </div>
          )})}
        </div>
      </div>
      <div className="message-input">
        <form className="message-input-form" onSubmit={handleSubmit}>
          <textarea 
            type="textarea"
            className="message-text"
            value={text}
            onChange={e => setText(e.target.value)}
            required 
          />
          <button className="send-btn secondary-btn"><img className="send-btn-icon" src={sendBtn} alt="Send"/></button>
        </form>
      </div>
    </div>
  )
}
