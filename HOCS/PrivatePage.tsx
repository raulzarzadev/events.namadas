import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAuthState } from 'store/slices/authSlice';

function PrivatePage(props: { children: any }) {
  const { user } = useSelector(selectAuthState);

  const router = useRouter();

  // if (user === undefined) {
  //   console.log('user undefined');
  //   return <div>Loading ... </div>;
  // }
  // if (!user) {
  //   console.log('user null');
  //   router.push('/');
  // }

  useEffect(() => {
    if (!user) {
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="text-center">
        <div>Not login</div>
        <div>Loading ...</div>
      </div>
    );
  }

  return <>{props.children}</>;
}

export default PrivatePage;
