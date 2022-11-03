import { useDispatch, useSelector } from "react-redux";
import { selectGeolocationState, setLocation } from "store/slices/geolocationSlice";

const useGeolocation = () => {
  const dispatch = useDispatch();
  const geolocation = useSelector(selectGeolocationState);

  const askForLocation = (askFor:boolean) => {
    if (askFor) {
      getLocation((res: any) => dispatch(setLocation(res)));
    } else {
      console.log('disable location');
      dispatch(setLocation(null));
    }
  };

  const getLocation = (cb:CallableFunction) => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
      function error(err:any) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }

      navigator.geolocation.getCurrentPosition(
        ({ coords }) =>
          cb({
            latitude: coords.latitude,
            longitude: coords.longitude,
            accuracy: coords.accuracy,
          }),
        error,
        options
      );
    } else {
      console.error('error ');
    }
  };

  
  return {geolocation, askForLocation}
};

export default useGeolocation;
