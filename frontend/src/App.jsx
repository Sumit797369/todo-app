import React from 'react'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import { useState } from 'react'

const App = () => {
  const [isLogin,setIsLogin] = useState(true);
  
  return (
    <div>
      {/* <Home/> */}
      {/* <Dashboard/> */}
      <Routes>
    <Route path="/" element={<Navigate to="/home"/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/home" element={<Home isLogin={isLogin} setIsLogin={setIsLogin} />}/>
    <Route path="/dashboard" element={<Dashboard setIsLogin={setIsLogin} />} />

      </Routes>
    </div>
  )
}

export default App
