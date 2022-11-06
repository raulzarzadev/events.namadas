import { listenUserCarts } from '@firebase/UserCart/main';
import { authStateChanged, googleLogin, logout } from '@firebase/Users/main';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthState, setAuthState } from 'store/slices/authSlice';

function useAuth() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, authState } = useSelector(selectAuthState);
  const [userCart, setUserCart] = useState({products:[]});
  const handleLogin = () => {
    googleLogin();
  };
  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    authStateChanged(async (res: any) => {
      dispatch(setAuthState({ ...res }));
      listenUserCarts((res:any)=> setUserCart(res[0]));
    });
  }, []);

  useEffect(() => {});

  return { isAuth: authState, user, handleLogin, handleLogout, userCart };
}

export default useAuth;
