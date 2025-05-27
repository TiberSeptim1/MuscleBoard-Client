import React, { useEffect, useState } from 'react';
import axios from 'axios';
import supabase from '../src/supabaseClient';
import { BASE_URL } from '../src/components/AppUrl';
import Top from '../src/sections/Top';
import Table from '../src/sections/Table';

const Dashboard = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
        const response = await axios.get(`${BASE_URL}/api/v1/subscriptions/`, {
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
    <>
      <Top searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Table members={members} loading={loading} searchTerm={searchTerm} />
    </>
  );
};

export default Dashboard;
