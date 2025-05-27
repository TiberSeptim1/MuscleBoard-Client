import React from 'react'

import SupaAuth from './sections/SupaAuth'
import { Analytics } from "@vercel/analytics/next"
import {Routes, Route} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoutes.jsx'
import CreateSub from './sections/CreateSub'
import Details from './sections/Details'
import Edit from './sections/Edit.jsx'
import Dashboard from '../pages/Dashboard.jsx'


const App = () => {
  return (
    <main className='min-h-screen w-full mx-auto font-poppins'>
    <Routes>
      <Route path='/login' element={
        <SupaAuth/>
        }/>
      <Route path='/' element={<ProtectedRoute>
          <div className='bg-gray-900 min-h-screen w-full p-6'>
          <div className='max-w-6xl mx-auto bg-gray-800 shadow-md rounded-lg p-8'>
          <Dashboard/>
          </div>
          </div>

        </ProtectedRoute>}/>
      <Route path='/members/create' element={<ProtectedRoute><CreateSub/></ProtectedRoute>}/>
      <Route path='/members/details/:id' element={<ProtectedRoute><Details/></ProtectedRoute>}/>
      <Route path='/members/edit/:id' element={<ProtectedRoute><Edit/></ProtectedRoute>}/>
    </Routes>
    <Analytics/>
    </main>
  )
}

export default App
