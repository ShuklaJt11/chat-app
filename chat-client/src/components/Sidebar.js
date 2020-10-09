import React, {useState} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import ContactList from './ContactList'
import ConversationList from './ConversationList'
import Modal from 'react-modal'
import NewConversationModal from './NewConversationModal'
import NewContactModal from './NewContactModal'

export default function Sidebar({id}) {
  const [tabIndex, setTabIndex] = useState(0)
  const [modalIsOpen,setIsOpen] = React.useState(false)
  function openModal() {
    setIsOpen(true)
  }
 
  function afterOpenModal() {
  }
 
  function closeModal(){
    setIsOpen(false)
  }
  
  return (
    <div className='sidebar-container'>
      <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
        <TabList>
          <Tab>Conversations</Tab>
          <Tab>Contacts</Tab>
        </TabList>

        <TabPanel>
          <ConversationList />
        </TabPanel>
        <TabPanel>
          <ContactList />
        </TabPanel>
        <div className="after-tab">
          <p className="sidebar-id"><strong className="sidebar-id-strong">Your Id: </strong> {id}</p>
          <button className="sidebar-btn primary-btn" onClick={openModal}>New {tabIndex ? 'Contact' : 'Conversation'}</button>
        </div>
      </Tabs>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        {
          tabIndex ?
            <NewContactModal closeModal={closeModal} /> :
            <NewConversationModal closeModal={closeModal} />
        }
      </Modal>
    </div>
  )
}
