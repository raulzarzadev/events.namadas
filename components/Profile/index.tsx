import useDevice from 'hooks/useDevice';
import { useEffect } from 'react';
import DesktopDashboard from './DesktopDashboard';
import MobileDashboard from './MobileDashboard';

function Profile() {
  const { isMobile } = useDevice();

  // console.log(user)
  return (
    <div className="">
      {isMobile ? <MobileDashboard /> : <MobileDashboard />}
    </div>
  );
}

export default Profile;
