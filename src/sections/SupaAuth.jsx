import React from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import supabase from '../supabaseClient.js'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../components/useAuth.js'



const SupaAuth = () => {
  const {user} = useAuth();
  if (user) return <Navigate to='/'/>
  return (
      <div style={{ maxWidth: 420, margin: '96px auto' }}>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google']}
          redirectTo={'http://localhost:5173'}
        />
      </div>
  )
}

export default SupaAuth
