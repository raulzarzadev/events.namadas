import { useCallback, useMemo, useState } from 'react';
import { Autocomplete, GoogleMap, useLoadScript } from '@react-google-maps/api';
import Icon from '@comps/Icon';
import useGeolocation from 'hooks/useGeolocation';
import { Coordinates } from '@firebase/Events/event.model';
interface PickerLocationType {
  className: string;
  setLocation?: ({ lat, lng }: { lat: number; lng: number }) => void;
  location?: { lat: number; lng: number };
}
const GOOGLE_MAP_LIBRARIES: (
  | 'places'
  | 'drawing'
  | 'geometry'
  | 'localContext'
  | 'visualization'
)[] = ['places'];
export default function PickerLocation({
  className,
  setLocation,
  location,
}: PickerLocationType) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: GOOGLE_MAP_LIBRARIES,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <Map className={className} setLocation={setLocation} location={location} />
  );
}

function Map({
  className = 'h-10',
  setLocation,
  location,
}: PickerLocationType) {
  const { geolocation: userLocation } = useGeolocation();

  const center = useMemo(
    () => location || userLocation || { lat: 24, lng: -110.36 },
    [location]
  );

  const [map, setMap] = useState<any>(null);

  const onLoad = useCallback((map: any) => {
    setMap(map);
  }, []);

  const [autocomplete, setAutocomplete] = useState(null);

  const onLoadAutocomplete = useCallback((autocomplete: any) => {
    console.log(autocomplete);
    setAutocomplete(autocomplete);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      // @ts-ignore
      const place = autocomplete?.getPlace()?.geometry;
      const lat = place?.location.lat();
      const lng = place?.location.lng();
      setLocation && setLocation({ lat, lng });
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  return (
    <div className="relative ">
      <div className="flex justify-center w-full">
        <Autocomplete
          onLoad={onLoadAutocomplete}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type="text"
            placeholder="Find the location"
            className="input input-bordered mx-auto"
            // style={{
            //   boxSizing: `border-box`,
            //   border: `1px solid transparent`,
            //   width: `240px`,
            //   height: `32px`,
            //   padding: `0 12px`,
            //   borderRadius: `3px`,
            //   boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            //   fontSize: `14px`,
            //   outline: `none`,
            //   textOverflow: `ellipses`,
            //   position: 'absolute',
            //   left: '50%',
            //   marginLeft: '-120px',
            // }}
          />
        </Autocomplete>
      </div>
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName={`${className}`}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onDragEnd={() => {
          const lat = map.getCenter().lat();
          const lng = map.getCenter().lng();
          console.log({ lat, lng });
          setLocation && setLocation({ lat, lng });
        }}
      >
        <span className="absolute top-1/2 left-1/2 text-error font-extrabold -translate-x-1/2 -translate-y-1/2">
          <Icon name="location" />
        </span>
      </GoogleMap>
    </div>
  );
}
