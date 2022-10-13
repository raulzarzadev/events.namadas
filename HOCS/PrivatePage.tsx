import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectAuthState } from "store/slices/authSlice";

function PrivatePage (props: { children: any; }) {
   const {user}=useSelector(selectAuthState)
   const router = useRouter()
   if(user===undefined){
    return <div>Loading ... </div>
   }
   if(user===null){
    router.push('/')
   }
    return (<>
      {props.children}
      </>)
}

export default PrivatePage