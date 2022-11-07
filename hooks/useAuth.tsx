import { getOneCart, listenCart, listenUserCarts } from '@firebase/UserCart/main';
import { UserCart } from '@firebase/UserCart/UserCart.model';
import { authStateChanged, googleLogin, logout, setUser } from '@firebase/Users/main';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthState, setAuthState } from 'store/slices/authSlice';

function useAuth() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, authState } = useSelector(selectAuthState);
  const [userCart, setUserCart] = useState<UserCart>({products:[]});
  const [cartId, setCartId]=useState('')
  const handleLogin = () => {
    googleLogin();
  };
  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    authStateChanged(async (res: any) => {
      dispatch(setAuthState({ ...res }));
     //  listenUserCarts((res:any)=> setUserCart(res[0]));
      
    });
  }, []);

  useEffect(() => {
    if (user?.id) getOneCart(user?.id).then((res)=>{
      setCartId(res.id)
      listenCart(res?.id, setUserCart)
    }
      );
  },[user]);

  return { isAuth: authState, user, handleLogin, handleLogout, userCart };
}

export default useAuth;
