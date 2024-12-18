
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing'
import Home from './pages/Home'
import { useState } from 'react'
function App() {
  const [addResponseFromLanding,setAddResponseFromLanding]=useState("")

  return (
    <>
     <Routes>
      {/* path for landing and home  */}
     <Route path='/landing' element={<Landing setAddResponseFromLanding={setAddResponseFromLanding}/>}/>
     <Route path='/' element={<Home addResponseFromLanding={addResponseFromLanding}/>}/>

     </Routes>
        
    </>
  )
}

export default App
