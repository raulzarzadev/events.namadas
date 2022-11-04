
import useDevice from "hooks/useDevice";
import { useEffect } from "react";
import DesktopDashboard from "./DesktopDashboard";
import MobileDashboard from "./MobileDashboard";

function Profile() {

const {isMobile}=useDevice()
console.log(isMobile)
  
  // console.log(user)
  return (
    <div className="" >
      {isMobile?
      <MobileDashboard/>
    :
      <DesktopDashboard/>
    }
      {/* */}
    </div>
  );
}



export default Profile;