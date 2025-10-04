import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../services/authService'
import { logout } from '../store/authslice'


function Logout() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.signOut().then(() => dispatch(logout()));
  };
  return (
    <button onClick={logoutHandler} className='inline-block px-6 py-2 duration-100 hover:bg-amber-200 rounded-full'>Logout</button>
  );
}


export default Logout
