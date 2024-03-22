import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import MainNavbar from './MainNavbar';
import Register from './Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Logout from './Logout';
import Home from './Home';
import React, { useState } from 'react'
import { useEffect } from 'react';
import ProtectedRoute from './ProtectedRoute';

function App() {



  let navigate=useNavigate()
 const [userDATA, setuserDATA] = useState(null)
 useEffect(() => {
  if(localStorage.getItem('token')){
    getUser()
  }
 }, [])
 
 const getUser=()=>{
  setuserDATA(localStorage.getItem("token"))
  
 }

 const logout=()=>{
  localStorage.removeItem(`token`)
  setuserDATA(null)
  navigate('/login')
 }

 
  return (
    < >
    
<div className='App'>
  <MainNavbar  getUser={getUser}  logout={logout} userDATA={userDATA}  />
<Routes>
<Route path='/' element={<Register/>} />
<Route path='/home' element={   <ProtectedRoute><Home userDATA={userDATA} /></ProtectedRoute>  } />
<Route path='/register' element={<Register/>} />
  <Route path='/login' element={<Login  getUser={getUser} />} />
  <Route path='*' element={<h3>NOT FOUND</h3>} />


</Routes>

</div>
    
    </>
  );
}

export default App;
