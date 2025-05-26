import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import supabase from '../supabaseClient';

const CreateSub = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [formData, setFormData]=useState({
    name:'',
    price:'',
    frequency:'',
    startDate:'',
    feesPaid:'',
    contact:'',
  })

  const handleChange = (e)=>{
    const {name , value} = e.target;
    setFormData((prev)=>({
      ...prev,
      [name]:value
    }));
  };

  const handleSubmit = async (e)=>{
    e.preventDefault()
    
    setLoading(true);
    const {data:sessionData} = await supabase.auth.getSession();
    const token = sessionData?.session?.access_token;
    const userId = sessionData?.session?.user?.id;
    console.log(userId)

    const data = {...formData,
      "userId":userId,
    }

    if(!token){
      console.error("no token")
      setLoading(false);
      return;
    }
    axios
    .post('http://localhost:5500/api/v1/subscriptions/', data,{
      headers:{
        Authorization: `Bearer ${token}`,
        'Content-Type':'application/json',
      }
    })
    .then (()=>{
      setLoading(false);
      navigate('/')
    })
    .catch((error)=>{
      setLoading(false);
      console.log(error); 
    })
  }
  
  return (

    
    <div className='bg-gray-900 min-h-screen w-full p-6'>
    <div className="max-w-3xl mx-auto bg-gray-800 shadow-md rounded-lg p-8 flex items-center justify-center px-4">
      {loading? <Spinner/>:'' }
        <div className="bg-transparent shadow-lg rounded-lg max-w-md w-full p-8">
    <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add New Member</h1>
    <form className="space-y-6" id="memberForm" onSubmit={handleSubmit}>
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Member full name"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-white">Price (₹)</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          min="0"
          step="50"
          required
          placeholder="Membership price"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      
      <div>
        <label htmlFor="frequency" className="block text-sm font-medium text-white">Frequency in Months</label>
        <input
          type="number"
          id="frequency"
          name="frequency"
          value={formData.frequency}
          onChange={handleChange}
          min="0"
          step="1"
          required
          placeholder="Months"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      
      <div>
        <label htmlFor="feesPaid" className="block text-sm font-medium text-white">Fees Paid (₹)</label>
        <input
          type="number"
          id="feesPaid"
          name="feesPaid"
          value={formData.feesPaid}
          onChange={handleChange}
          min="0"
          step="50"
          required
          placeholder="Amount paid"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      
      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-white">Start Date</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="contact" className="block text-sm font-medium text-white">Contact</label>
        <input
          type="text"
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Contact (Optional)"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-md text-lg font-medium hover:bg-indigo-700 transition"
      >
        Create Member
      </button>
    </form>
  </div>
    </div>
    </div>
  )
}

export default CreateSub
