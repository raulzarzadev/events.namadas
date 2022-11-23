import { Coordinates } from '@firebase/Events/event.model';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectGeolocationState,
  setLocation,
} from 'store/slices/geolocationSlice';

const useGeolocation = () => {
  const dispatch = useDispatch();
  const geolocation = useSelector(selectGeolocationState);

  const askForLocation = (askFor: boolean) => {
    if (askFor) {
      getLocation((res: any) => dispatch(setLocation(res)));
    } else {
      console.log('disable location');
      dispatch(setLocation(null));
    }
  };

  const getLocation = (cb: CallableFunction) => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0,
      };
      function error(err: any) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }

      navigator.geolocation.getCurrentPosition(
        ({ coords }) =>
          cb({
            lat: coords.latitude,
            lng: coords.longitude,
            accuracy: coords.accuracy,
          }),
        error,
        options
      );
    } else {
      console.error('error ');
    }
  };

  const distanceBetween = (
    l1: Coordinates,
    l2: Coordinates,
    options?: CalculateDistanceBetweenOptions
  ) => {
    const latLngA = new google.maps.LatLng(l1?.lat, l1?.lng);
    const latLngB = new google.maps.LatLng(l2?.lat, l2?.lng);
    // const unit = options?.unit === 'm' ? 10000 : 1000;
    const unities = {
      m: 1000,
      k: 100,
    };
    if (google) {
      const distance =
        google.maps.geometry.spherical.computeDistanceBetween(
          latLngA,
          latLngB
        ) / unities[options?.unit || 'm'];
      console.log(distance);
      return distance.toFixed(2);
    }
  };

  return { geolocation, askForLocation, distanceBetween };
};

export interface CalculateDistanceBetweenOptions {
  unit: 'm' | 'k';
}

export default useGeolocation;
