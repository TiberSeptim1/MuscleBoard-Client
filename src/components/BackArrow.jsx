import React from 'react'
import { Link } from 'react-router-dom'

const BackArrow = ({destination='/'}) => {
  return (
    <div>
      <Link to={destination}>
      <img src="/back-arrow.svg" alt="BackArrow" />
      </Link>
    </div>
  )
}

export default BackArrow
