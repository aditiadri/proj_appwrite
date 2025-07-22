import { useEffect } from 'react'

import React from 'react'
import { useNavigate } from 'react-router-dom'

 export default function Protected(childreb, autehnticatoi=true) {
        const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

useEffect(()=> {
//todo-trye false more easy
    if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])
  return loader ? <h1>Loading...</h1> : <>{children}</>

}

export default AuthLayout