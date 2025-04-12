import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from './pages/Navbar'
import Footer from './pages/Footer'
import AuthPages from './pages/LoginAndSignup'
import Dashboard from './pages/Dashboard'
import ContactSupport from './pages/ContactUs'
import EquipmentGuide from './pages/Equipments'
import MyPayments from './pages/MyPayments'
import ProfilePage from './pages/Profile'
import MySubscription from './pages/Subscription'


  // I am creating a super Cool Gym Management Website using React, tailwindcss and framer-motion with colors PurposeColorTailwind ClassPrimary#1F2937 (Gunmetal)bg-gray-800 or bg-[#1F2937]Accent#10B981 (Emerald)bg-emerald-500Highlight#F59E0B (Amber)bg-amber-500Text#F9FAFB (White)text-gray-100Secondary#374151 (Slate)bg-slate-700.


function App() {
 

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>

        {/* <Route element = {() => <div className='bg-black'>Home page</div>} path="/" /> */}
        <Route path="/login" element={<AuthPages/>} />
        <Route path="/subscription" element={<MySubscription/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/payments" element={<MyPayments/>} />
        <Route path="/equipments" element={<EquipmentGuide/>} />
        <Route path="/contact" element={<ContactSupport/>} />
        <Route path="/" element={<Dashboard/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
