import React from 'react'
import Sidebar from './Sidebar'

export default function Dashboard({id}) {
  return (
    <div className='dashboard-container' id='dashboard-container-id' >
      <Sidebar id={id} />
      <div className="area2">Things to come</div>
    </div>
  )
}
