import { useState } from 'react'


import {AuthProvider} from "./AuthContext"; // Importa el contexto de autenticación
import PrivateRoute from './PrivateRoute '; // o ajusta el path si está en otra carpeta


//import routes or  others pages
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from '../Home/Home';
import User from '../User/User';
import Login from '../Login/Login';
import Panel from '../Panel/Panel';


function Routers() {

  return (
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/user' element={<PrivateRoute element={<User />} />} />
                <Route path='/login' element={<Login />} />
                <Route path='/panel' element={<Panel />} />
            </Routes>
        </BrowserRouter>
    </AuthProvider>
 
  )
}
export { Routers as MyRoutes };

