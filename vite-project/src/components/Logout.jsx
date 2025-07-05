import React from 'react'
import { useDispatch } from 'react-redux'
import authService, { AuthServices } from '../appwrite/auth'
import logout from '../store/authslice'
 

 function Logout() {
    const dispath=useDispatch()
    const logoutHandler=()=>{
        authService.logout()
    }
  return (

<button className='inline-block px-6 py-2 duration-100 hover:bg-amber-200 rounded-full'>Logout</button>
  )
}


export default Logout
