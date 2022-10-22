import { authStateChanged, googleLogin, logout } from '@firebase/Users/main';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthState, setAuthState } from 'store/slices/authSlice';

function useAuth() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, authState } = useSelector(selectAuthState);

  const handleLogin = () => {
    googleLogin();
  };
  const handleLogout = () => {
    logout();
  };


  useEffect(() => {
    authStateChanged((res: any) => {
      dispatch(setAuthState(res));
    });
  }, []);

  return { isAuth: authState, user, handleLogin, handleLogout };
}

export default useAuth;
