import { useState } from 'react'
import './App.css'

//import routes or  others pages
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {MyRoutes} from './assets/Routes/Routers'


function App() {

  return (
    <div>
      <MyRoutes />
    </div>
  )
}

export default App
