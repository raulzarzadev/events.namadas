import { getOneCart, listenCart } from '@firebase/UserCart/main'
import { UserCartDTO } from '@firebase/UserCart/UserCart.model'
import { authStateChanged, googleLogin, logout } from '@firebase/Users/main'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuthState, setAuthState } from 'store/slices/authSlice'

function useAuth() {
  const dispatch = useDispatch()
  const { user, authState } = useSelector(selectAuthState)
  const [userCart, setUserCart] = useState<UserCartDTO>({ products: [] })
  const handleLogin = () => {
    googleLogin()
  }
  const handleLogout = () => {
    logout()
  }

  useEffect(() => {
    authStateChanged(async (res: any) => {
      dispatch(setAuthState(res))
      //  listenUserCarts((res:any)=> setUserCart(res[0]));
    })
  }, [])

  useEffect(() => {
    if (user?.id) {
      getOneCart(user?.id).then((res) => {
        if (res) {
          listenCart(res?.id, setUserCart)
        }
      })
    }
  }, [user])

  return { isAuth: authState, user, handleLogin, handleLogout, userCart }
}

export default useAuth
