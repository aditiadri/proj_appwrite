import React from 'react'
import { useState,useEffect } from 'react'
import { Service } from '../appwrite/config'
import { Postcards,Container } from '../components'
import appwriteService from "../appwrite/config"


function AllPosts() {
    const [posts,setPosts]= useState([])
    useEffect(()=>[])
    appwriteService.getPosts([]).then((posts)=>{
        if(posts){
            setPosts(posts.documents)
        }

    })
  return (
    <div className='w-full py-8'>
        <Container>
          <div className="flex flex-wrap">
            {posts.map((post)=>(
                <div key={post.$id}className='p-3 w-1/4'>
                    <Postcards post={post}/>
                </div>
            ))}

          </div>
        </Container>
        </div>
  )
}

export default AllPosts