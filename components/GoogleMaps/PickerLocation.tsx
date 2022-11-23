import { useCallback, useMemo, useState } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import Icon from '@comps/Icon';
import useGeolocation from 'hooks/useGeolocation';
interface PickerLocationType {
  className: string;
  setLocation?: ({ lat, lng }: { lat: number; lng: number }) => void;
  location?: { lat: number; lng: number };
}
export default function PickerLocation({
  className,
  setLocation,
  location,
}: PickerLocationType) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
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
    []
  );

  const [map, setMap] = useState<any>(null);

  const onLoad = useCallback((map: any) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return (
    <div className="relative">
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName={`${className} `}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onDragEnd={() => {
          const lat = map.getCenter().lat();
          const lng = map.getCenter().lng();
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
