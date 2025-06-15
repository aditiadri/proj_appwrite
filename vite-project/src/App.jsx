import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch } from 'react-redux'
import AuthServices from './appwrite/auth'
import {login} from "./store/authslice"
import {logout} from "./store/authslice"
import { Footer } from './components/Header'

function App() {
const[loading , setLoading]=useState(true)
const dispatch=useDispatch()


useEffect(()=> {
  authService.getCurrentUser()
  .then((userData)=>{if(userData)
  {
    dispatch(login({userData}))
  }else{
    dispatch(logout())
  }
  })
  .finally(()=> setLoading(false))
},[])

  return !loading ? (
   <div className='min-h-screen flex flex-wrap content-between bg-amber-200'>
    <div className='w-full'>
      <Header/>
      <Footer/>
      
    </div>
   </div>
  ):null
}

export default App
