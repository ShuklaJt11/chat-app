import React from 'react'
import { useState } from 'react'

export default function OpenConversation() {
  const [text, setText] = useState('')
  const handleSubmit = e => {
    e.preventDefault()
  }
  return (
    <div className="area2">
      <div className="messages-list">Opened Conversation here</div>
      <div className="message-input">
        <form className="message-input-form" onSubmit={handleSubmit}>
          <textarea 
            type="textarea"
            className="message-text"
            value={text}
            onChange={e => setText(e.target.value)}
            required 
          />
          <button className="send-btn secondary-btn">Send</button>
        </form>
      </div>
    </div>
  )
}
