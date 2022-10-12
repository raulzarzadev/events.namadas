import Profile from "@comps/Profile";
import withAuth from "@comps/HOCs/PrivatePage";

const ProfilePage = () => {
  return (
    <div>
      <Profile/>
    </div>
  );
}

export default withAuth(ProfilePage);