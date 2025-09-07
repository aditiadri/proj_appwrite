import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function Postcards({$id,title,featuredImage}) {
    
  return (
<Link to={`/post/${$id}`}>
<div className='w-full bg-gray-100 rounded-2xl'>
  <div className='w-full justify-center mb-4'>
    
    <img src={appwriteService.getFilePreview(featuredImage)} alt='{title}'
    className='rounded-2xl'/>
    
    </div><h2 className='text-2xl font-extrabold'>{title}</h2></div></Link>



  )
}

export default Postcards