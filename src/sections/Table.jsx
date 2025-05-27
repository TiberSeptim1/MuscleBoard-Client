import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spinner';
import supabase from '../supabaseClient';
import { Link } from 'react-router-dom';
import SkeletalLoaderTable from '../components/SkeletalLoaderTable';


const Table = () => {

const [members, setMembers] = useState([]);
const [loading, setLoading] = useState(false);

const formatDate=(dateString)=>{
  const options = {day:'numeric', month:'short', year:'numeric'}
  return new Date(dateString).toLocaleDateString('en-US',options)
};

useEffect(()=>{
  setLoading(true);
  const fetchMembers = async () => {
    setLoading(true);

    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData?.session?.access_token;

    if (!token) {
      console.error('No token found');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('http://localhost:5500/api/v1/subscriptions/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMembers(response.data.data);
    } catch (error) {
      console.error('Error fetching members:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchMembers();
}, []);

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto text-sm w-full md:text-base">
      {loading?(
    <table className="w-full table-auto border-collapse ">
      <thead className="bg-gray-300 font-semibold text-gray-700 sticky">
        <tr>
          <th className="text-left px-6 py-4">Name</th>
          <th className="text-left px-6 py-4">Membership Plan</th>
          <th className="text-left px-6 py-4">
Expiry Date</th>
          <th className="text-left px-6 py-4">Status</th>
          <th className="text-left px-6 py-4">Detail</th>
        </tr>
      </thead>
      <tbody>
      {Array.from({ length: 5 }).map((_, idx) => (
        <SkeletalLoaderTable key={idx} />
      ))}
    </tbody>
  </table>
) : (
      
  <table className="w-full table-auto border-collapse ">
  <thead className="bg-gray-300 font-semibold text-gray-700 sticky">
    <tr>
      <th className="text-left px-6 py-4">Name</th>
      <th className="text-left px-6 py-4">Membership Plan</th>
      <th className="text-left px-6 py-4">Expiry Date</th>
      <th className="text-left px-6 py-4">Status</th>
      <th className="text-left px-6 py-4">Detail</th>
    </tr>
  </thead>
      <tbody>
        {members.map(({ name, frequency, endDate, status, _id }, i) => (
          <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
            <td className="px-6 py-4">{name}</td>
            <td className="px-6 py-4">{frequency} Months</td>
            <td className="px-6 py-4">{formatDate(endDate)}</td>
            <td className="px-6 py-4">
              <span className={`font-medium ${
    status === 'active'? 'text-green-500': status === 'expired'? 'text-gray-400': status==='pending'?'text-yellow-500':'text-red-500'} font-medium`}>{status}</span>
            </td>
            <td className="px-6 py-4">
             
                <Link className="text-blue-600 font-medium hover:underline" to={`/members/details/${_id}`}>
                View
                </Link>
            </td>
          </tr>
        ))}
      </tbody>
      
    </table>
  )}
  </div>
  )
}

export default Table
