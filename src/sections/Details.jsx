import React from 'react'

const Details = () => {
  const member = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+91 9876543210',
    joined: 'July 11, 2022',
    type: 'Gold Member',
  };

  return (
    <div className="w-full p-6 bg-gradient-to-r from-blue-100 to-blue-200 font-sans min-h-[40vh]">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        
        {/* Left: Member Info */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">{member.name}</h1>
          <p className="text-indigo-700 font-semibold text-lg">{member.type}</p>
          <div className="text-gray-700 text-sm space-y-1 mt-2">
            <p><span className="font-medium">Email:</span> {member.email}</p>
            <p><span className="font-medium">Phone:</span> {member.phone}</p>
            <p><span className="font-medium">Joined:</span> {member.joined}</p>
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => alert('Edit member')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow transition-all"
          >
            Edit
          </button>
          <button
            onClick={() => window.confirm('Delete this member?') && alert('Deleted')}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow transition-all"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details
