import React from 'react'
import { Link } from 'react-router-dom'

const BackArrow = ({destination='/'}) => {
  return (
    <div className='bg-transparent rounded-md shadow-md hover:shadow-xl hover:scale-110 transition-all w-10'>
      <Link to={destination}>
      <img src="/back-arrow.svg" alt="BackArrow" />
      </Link>
    </div>
  )
}

export default BackArrow
