import Icon from '@comps/Icon';
import useGeolocation from 'hooks/useGeolocation';

const GeolocationInput = () => {
  const { geolocation ,askForLocation} = useGeolocation();
  return (
    <div className='mr-2 flex'>
      {geolocation ? (
        <button onClick={() => askForLocation(false)}>
          <Icon name="location"  />
        </button>
      ) : (
        <button onClick={() => askForLocation(true)}>
          <Icon name="hideLocation" />
        </button>
      )}
    </div>
  );
};

export default GeolocationInput;
