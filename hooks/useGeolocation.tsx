import { Coordinates } from '@firebase/Events/event.model';
import { useEffect } from 'react';
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
        //  enableHighAccuracy: false,
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
    const defaultUnit: CalculateDistanceBetweenOptions['unit'] = 'k';
    const unit = options?.unit || defaultUnit;

    const unities = {
      m: 100,
      k: 1000,
    };
    if (window.google) {
      const latLngA = new window.google.maps.LatLng(l1?.lat, l1?.lng);
      const latLngB = new window.google.maps.LatLng(l2?.lat, l2?.lng);
      const distance =
        window.google?.maps?.geometry?.spherical?.computeDistanceBetween(
          latLngA,
          latLngB
        ) / unities[unit];

      return distance.toFixed(2);
    } else {
      // console.error("could't ");
    }
  };

  return { geolocation, askForLocation, distanceBetween };
};

export interface CalculateDistanceBetweenOptions {
  unit: 'm' | 'k';
}

export default useGeolocation;
