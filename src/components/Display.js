import React from 'react'
import { useSelector } from 'react-redux'

function Display() {
  const display = useSelector(state => state.display)
  return (
    <div className="display">
        <div className="display-area">{display}</div>
    </div>
  )
}

export default Display