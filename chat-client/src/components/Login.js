import React, {useRef} from 'react'
import {v4 as uuidV4} from 'uuid'

export default function Login({onIdSubmit}) {
  const idRef = useRef()

  const handleSubmit = e => {
    e.preventDefault()
    onIdSubmit(idRef.current.value)
  }

  const createNewId = e => {
    e.preventDefault()
    onIdSubmit(uuidV4())
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} >
        <input type="text" ref={idRef} placeholder="Enter Your ID" />
        <button type="submit" className="primary-btn" >Login</button>
        <button className="secondary-btn mar-left-5" onClick={createNewId} >Create A New ID</button>
      </form>
    </div>
  )
}
