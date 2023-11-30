import React,{useState} from 'react'
import { loginContext } from './loginContext'
import axios from 'axios'

function UserLoginContextStore({children}) {
    //required states
    let [currentUser,setCurrentUser]=useState({})
    let [error,setError]=useState("")
    let [userLoginStatus,setUserLoginStatus]=useState(false)

    //user login
    const loginUser=(userCredObj)=>{
        axios.post('http://localhost:4089/login',userCredObj)
        .then((response)=>{
            if(response.status==201){
                //upadate current user
                setCurrentUser({...response.data.user})
                //update user login status
                setUserLoginStatus(true)
                //store jwt token
                localStorage.setItem("token",response.data.payload)
            }
            else{
                setError(response.data.message)
            }
        })
        .catch(err=>{
            setError(err.message)
        })
    }

    //log out user
    const logoutUser=()=>{
        localStorage.clear()
        setUserLoginStatus(false)
        setCurrentUser({})
    }

  return (
    <loginContext.Provider value={[currentUser,error,userLoginStatus,loginUser,logoutUser]}>
        {children}
    </loginContext.Provider>
  )
}

export default UserLoginContextStore