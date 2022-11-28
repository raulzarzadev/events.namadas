import GeolocationInput from '@comps/inputs/GeolocationInput'
import { Coordinates } from '@firebase/Events/event.model'
import useGeolocation from 'hooks/useGeolocation'

const DistanceFromUser = ({ location }: { location?: Coordinates }) => {
  const { geolocation: userLocation, distanceBetween } = useGeolocation()
  if (!location)
    return (
      <div className="text-center">{"This event doesn't have location"}</div>
    )
  if (!userLocation)
    return (
      <div className="group text-center relative">
        <span className="group-hover:block hidden absolute -top-2 w-1/2 right-0 bg-info text-info-content rounded-lg shadow-md">
          Activate your geolocation to calculate distance to this event
        </span>
        <div className="flex justify-center w-full">
          <GeolocationInput />
        </div>
      </div>
    )
  const dist = distanceBetween(userLocation, location, { unit: 'k' })
  return (
    <div className="text-center">
      <span>{dist} km away</span>
    </div>
  )
}
export default DistanceFromUser
