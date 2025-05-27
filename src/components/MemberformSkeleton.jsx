import React from 'react'

const MemberformSkeleton = () => {
  return (
    <div className="bg-transparent shadow-lg rounded-lg max-w-md w-full p-8">
      <div className="bg-transparent shadow-lg rounded-lg max-w-md w-full p-8 animate-pulse">
    <div className="h-6 bg-gray-700 rounded w-1/2 mx-auto mb-6"></div>

    {[...Array(6)].map((_, i) => (
      <div key={i} className="mb-4">
        <div className="h-4 bg-gray-600 rounded w-1/3 mb-2"></div>
        <div className="h-10 bg-gray-700 rounded w-full"></div>
      </div>
    ))}

    <div className="h-10 bg-gray-700 rounded w-full mt-6"></div>
  </div>
    </div>
  )
}

export default MemberformSkeleton
