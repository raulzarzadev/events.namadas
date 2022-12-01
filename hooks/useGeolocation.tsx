import { Coordinates } from '@firebase/Events/event.model'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectGeolocationState,
  setLocation
} from 'store/slices/geolocationSlice'

const useGeolocation = () => {
  const dispatch = useDispatch()
  const geolocation = useSelector(selectGeolocationState)
  const askForLocation = (askFor: boolean) => {
    if (askFor) {
      getLocation((res: any) => dispatch(setLocation(res)))
    } else {
      console.log('disable location')
      dispatch(setLocation(null))
    }
  }

  const getLocation = (cb: CallableFunction) => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: false,
        timeout: 3000,
        maximumAge: Infinity
      }
      function onError(err: any) {
        console.log(err)
        console.warn(`ERROR(${err.code}): ${err.message}`)
      }

      navigator.geolocation.getCurrentPosition(
        ({ coords }) =>
          cb({
            lat: coords.latitude,
            lng: coords.longitude,
            accuracy: coords.accuracy
          }),
        onError,
        options
      )
    } else {
      console.warn('error no geolocation')
    }
  }

  const distanceBetween = (
    l1: Coordinates,
    l2: Coordinates,
    options?: CalculateDistanceBetweenOptions
  ) => {
    const defaultUnit: CalculateDistanceBetweenOptions['unit'] = 'k'
    const unit = options?.unit || defaultUnit

    const unities = {
      m: 1000,
      k: 1
    }

    function distance(lat1: number, lon1: number, lat2: number, lon2: number) {
      var p = 0.017453292519943295 // Math.PI / 180
      var c = Math.cos
      var a =
        0.5 -
        c((lat2 - lat1) * p) / 2 +
        (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2

      return 12742 * Math.asin(Math.sqrt(a)) // 2 * R; R = 6371 km
    }

    const dist = distance(l1.lat, l1.lng, l2.lat, l2.lng)

    // transform to unit and set 2 digits
    const formatDistance = (dist * unities[unit]).toFixed(2)

    return formatDistance
  }

  return { geolocation, askForLocation, distanceBetween }
}

export interface CalculateDistanceBetweenOptions {
  unit: 'm' | 'k'
}

export default useGeolocation
