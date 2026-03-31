import React from 'react'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import { useState } from 'react'
import Todo from './components/Todo'

const App = () => {
  const [isLogin,setIsLogin] = useState(true);
  // 
  // 
  return (
    <div>
      {/* <Home/> */}
      {/* <Dashboard/> */}
      <Routes>
    <Route path="/" element={<Navigate to="/login"/>}/>
    <Route path="/login"  element={ isLogin ? <Navigate to="/dashboard"/> : <Login setIsLogin={setIsLogin}/> } />
    <Route path="/signup" element={<Signup/>}/>
    {/* <Route path="/home" element={<Home isLogin={isLogin} setIsLogin={setIsLogin}  />}/> */}
    <Route path="/dashboard" element={ isLogin ? <Dashboard setIsLogin={setIsLogin}/> : <Navigate to="/login"/> }  />
  
      </Routes>
    </div>
  )
}

export default App
