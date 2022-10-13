import { googleLogin, logout } from "@firebase/Users/main";
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { selectAuthState } from "store/slices/authSlice"

function useAuth(){
    const handleLogin = () => {
      googleLogin();
    };
    const handleLogout = () => {
      logout();
    };
  
  const router = useRouter()
  const {user, authState}=useSelector(selectAuthState)
  useEffect(()=>{
    if(!user===null){
      router.push('/')
    }
  },[])
  return { isAuth: authState, user, handleLogin, handleLogout };
}

export default useAuth