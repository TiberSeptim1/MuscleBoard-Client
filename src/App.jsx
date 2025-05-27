import React from 'react'

import SupaAuth from './sections/SupaAuth'
import { Analytics } from "@vercel/analytics/react";
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
          <div className='bg-gray-900 min-h-screen px-2 py-4'>
          <div className='w-full sm:w-11/12 md:w-3/4 lg:w-2/3 mx-auto bg-gray-800 shadow-md rounded-lg md:p-8 p-1'>
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
