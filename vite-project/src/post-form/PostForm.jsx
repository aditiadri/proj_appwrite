import React ,{ useCallback } from "react"
import { useForm } from "react-hook-form"
import {Button, Input, Select,RTE} from "../components/index"
import service from "../appwrite/config"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
function PostForm({post}) {
    const {register,handleSubmit,watch,setValue,control,getValues}=useForm({

defaultValues :{
    title:post?.title || '',
    slug:post?.slug ||'',
     content:post?.content ||'',
      status:post?.status ||'active',
}
 })
    const navigate=useNavigate()
    const userData= useSelector(state=> state.user.userData)

     const submit =async (data)=>{

      
        if(post){
      const file=data.image[0]? service.uploadFile(data.image[0]):null//onSubmit se aaya data
      
      if(file){
        service.deleteFile(post.featuredImage)
      }
      const dbPost=await(service.updatePost(post.$id,{
        ...data,
        
      }))
        }



     }

  return (
    <div>PostForm</div>
  )
}

export default PostForm