import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import supabase from '../supabaseClient';
import { Link } from 'react-router-dom';
import SkeletalLoaderDetails from '../components/SkeletalLoaderDetails';
import { BASE_URL } from '../components/AppUrl';


const Details = () => {
  const navigate = useNavigate();
  const formatDate=(dateString)=>{
    const options = {day:'numeric', month:'short', year:'numeric'}
    return new Date(dateString).toLocaleDateString('en-US',options)
  };
  const [member, setMember] = useState({})
  const [loading, setLoading] = useState(false)
  const {id}= useParams();

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
        const response = await axios.get(`${BASE_URL}/api/v1/subscriptions/history/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setMember(response.data.data);
      } catch (error) {
        console.error('Error fetching member:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchMembers();
  },[id]);

  const handleDeleteSubscription = async () => {
    if (!window.confirm('Delete this subscription?')) return;

    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData?.session?.access_token;
    const userId = sessionData?.session?.user?.id;

    setLoading(true);
    axios
      .delete(`${BASE_URL}/api/v1/subscriptions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data:{
            "userId" :`${userId}`
        }
      })
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };
  
  const handleDeleteHistoryById = async (historyId) => {
    if (!window.confirm('Delete this history entry?')) return;
  
    setLoading(true);
  
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;
  
      if (!token) {
        console.error('No token found');
        setLoading(false);
        return;
      }
  
      await axios.delete(`${BASE_URL}/api/v1/subscriptions/history/${historyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setMember((prev) => ({
        ...prev,
        history: prev.history.filter((h) => h._id !== historyId),
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteAllHistory = async () => {
    if (!window.confirm('Delete all history for this subscription?')) return;
  
    setLoading(true);
  
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;
  
      if (!token) {
        console.error('No token found');
        setLoading(false);
        return;
      }
  
      await axios.delete(`${BASE_URL}/api/v1/subscriptions/history/subscription/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setMember((prev) => ({
        ...prev,
        history: [],
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 font-poppins p-6">
    {loading ? (
        <SkeletalLoaderDetails/>
      ) : (
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Top Card */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">{member.name}</h1>
              <div className="text-gray-700 text-sm space-y-1 mt-2">
                <p><span className="font-bold">Phone:</span> {member.contact}</p>
                <p><span className="font-bold">Start Date:</span> {formatDate(member.startDate)}</p>
                <p><span className="font-bold">End Date:</span> {formatDate(member.endDate)}</p>
                <p><span className="font-bold">Price:</span> {member.price}</p>
                <p><span className="font-bold">Fees Paid:</span> {member.feesPaid}</p>
                <p><span className="font-bold">Months:</span> {member.frequency}</p>
              </div>
            </div>

            <div className="flex gap-4">

              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow transition-all"
              >
                <Link to={`/members/edit/${id}`}>
                Edit
                </Link>
              </button>
              <button
                onClick={handleDeleteSubscription}
                className="bg-red-500 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow transition-all"
              >
                Delete
              </button>
            </div>
          </div>
          {/* History Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Membership History</h2>
            <div className='bg-red-500 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow transition-all w-fit mb-5' onClick={handleDeleteAllHistory}>Delete All History</div>
            <div className="space-y-4">
                {member.history && member.history.length > 0 ? (
                  member.history.map(({frequency, endDate, status, startDate, feesPaid, price, _id }, i) => (
                    <div
                      key={i}
                      className="bg-white border-l-4 p-4 rounded-lg shadow-sm hover:shadow-md transition-all border-blue-400"
                    >
                    <div className="flex justify-between items-center">
                      <div className='border-b border-zinc-950 '>
                        <p className="text-sm text-gray-600">
                          {formatDate(startDate)} → {formatDate(endDate)}
                        </p>
                      </div>
                      <div className='flex-col justify-center items-center'>
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded-full ${
                          status === 'active'? 'text-green-500': status === 'expired'? 'text-gray-400': status==='pending'?'text-yellow-500':'text-red-500'}`}
                          >
                        {status}
                      </span>
                      <img className='mt-6 w-8' src="/delete.svg" alt="dustbin" onClick={()=>handleDeleteHistoryById(_id)}>

                      </img>
                        </div>
                      
                    </div>
                    <div className="mt-3 text-gray-700 text-sm grid gap-1 md:grid-cols-2">
                    
                      <p><strong>Fees Paid:</strong> {feesPaid}</p>
                      <p><strong>Frequency:</strong> {frequency}</p>
                      <p><strong>Price:</strong> {price}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">No history available.</p>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};


export default Details
