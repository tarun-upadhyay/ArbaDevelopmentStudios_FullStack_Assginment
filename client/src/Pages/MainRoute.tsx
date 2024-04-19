import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './auth/Login'
import Signup from './auth/Signup'

const MainRoute = () => {
  return (
    <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
    </Routes>
  )
}

export default MainRoute