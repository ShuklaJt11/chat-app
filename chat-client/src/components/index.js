import React from 'react'
import Login from './Login'
import Dashboard from './Dashboard'
import useLocalStorage from '../hooks/useLocalStorage'
import {ContactsProvider} from '../contexts/ContactsProvider'
import {ConversationsProvider} from '../contexts/ConversationsProvider'

function App() {
  const [id, setId] = useLocalStorage('id')

  const dashboard = <ContactsProvider>
    <ConversationsProvider>
      <Dashboard id={id} />
    </ConversationsProvider>  
  </ContactsProvider>

  return (
    <div className="app-container">
      {
        id ? 
          dashboard : 
          <Login onIdSubmit={setId} />
      }
    </div>
  );
}

export default App