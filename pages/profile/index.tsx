
import Profile from "@comps/Profile";
import useAuth from "hooks/useAuth";

const ProfilePage = () => {
const {isAuth, user}=useAuth()
console.log(isAuth, user)

 
  return (
    <div>
      <Profile/>
    </div>
  );
}

export default ProfilePage;