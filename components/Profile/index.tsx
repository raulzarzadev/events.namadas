import useDevice from 'hooks/useDevice'
import MobileDashboard from './MobileDashboard'

function Profile() {
  const { isMobile } = useDevice()

  // console.log(user)
  return (
    <div className="">
      {isMobile ? <MobileDashboard /> : <MobileDashboard />}
    </div>
  )
}

export default Profile
