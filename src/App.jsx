import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Adminroute from './Modules/Admin/ARoutes/Adminroute'
import UserRoute from './Modules/User/URoutes/UserRoute'
import { StoreProvider } from "./context/StoreContext";

export default function App() {
  return (
    <StoreProvider>   {/* ✅ IMPORTANT */}
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<UserRoute/>}/>
          <Route path='/Admin/*' element={<Adminroute/>}/>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  )
}