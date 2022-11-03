import { Toggle } from '@comps/inputs';
import useGeolocation from 'hooks/useGeolocation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectGeolocationState,
  setLocation,
} from 'store/slices/geolocationSlice';

const LocationForm = () => {
  const {geolocation, askForLocation}=useGeolocation()
  
  // const [position, setPosition] = useState(null);

  console.log(geolocation);
  return (
    <div>
      <Toggle
        onChange={(({target:{checked}})=>askForLocation(checked))}
        name="allowLocation"
        label="allow your location"
        errors={{}}
        checked={!!geolocation}
      />
    </div>
  );
};

export default LocationForm;
