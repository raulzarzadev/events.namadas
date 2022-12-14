import { useCallback, useMemo, useState } from 'react'
import { Autocomplete, GoogleMap, useLoadScript } from '@react-google-maps/api'
import Icon from '@comps/Icon'
import useGeolocation from 'hooks/useGeolocation'
import { Coordinates } from '@firebase/Events/event.model'
import Modal from '@comps/modal'
interface PickerLocationType {
  className: string
  setLocation?: (location: Coordinates) => void
  location?: Coordinates
  disabled?: boolean
  label?: string
}
const GOOGLE_MAP_LIBRARIES: Array<
  'places' | 'drawing' | 'geometry' | 'localContext' | 'visualization'
> = ['places']

export default function PickerLocation({
  disabled,
  className = 'h-10',
  setLocation,
  location,
  label = 'Selecciona una ubicación'
}: PickerLocationType) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
    libraries: GOOGLE_MAP_LIBRARIES
  })

  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }
  if (!isLoaded) return <div>Loading...</div>
  return (
    <div>
      <div className=" ">
        <label className="flex w-full justify-center ">
          {location?.address ?? label}
          <button
            className=""
            onClick={(e) => {
              e.preventDefault()
              handleOpenModal()
            }}
          >
            <Icon name="location" />
          </button>
        </label>
      </div>
      <Modal
        size="full"
        title="Slecciona una ubicación"
        open={openModal}
        handleOpen={handleOpenModal}
      >
        <Map
          className={className}
          setLocation={setLocation}
          location={location}
          disabled={disabled}
        />
      </Modal>
    </div>
  )
}

function Map({
  className,
  setLocation,
  location,
  disabled
}: PickerLocationType) {
  const { geolocation: userLocation } = useGeolocation()
  const center = useMemo(
    () => location ?? (userLocation || { lat: 24, lng: -110.36 }),
    [location, userLocation]
  )

  const [map, setMap] = useState<any>(null)

  const onLoad = useCallback((map: any) => {
    setMap(map)
  }, [])

  const [autocomplete, setAutocomplete] = useState(null)

  const onLoadAutocomplete = useCallback((autocomplete: any) => {
    // console.log(autocomplete);
    setAutocomplete(autocomplete)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      // @ts-expect-error
      const place = autocomplete?.getPlace()
      const lat = place?.geometry?.location.lat()
      const lng = place?.geometry?.location.lng()
      const address = place?.formatted_address
      setLocation?.({ lat, lng, address })
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

  return (
    <div className="relative ">
      <div className="form-control">
        <label className="">
          <span className="label-text">Location</span>
        </label>
        {!disabled && (
          <Autocomplete
            onLoad={onLoadAutocomplete}
            onPlaceChanged={onPlaceChanged}
          >
            <input
              type="text"
              placeholder="Find a location"
              className="input input-bordered mx-auto w-full mb-2"
              defaultValue={location?.address}
            />
          </Autocomplete>
        )}
      </div>
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName={` ${className} `}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onDragEnd={() => {
          const lat = map.getCenter().lat()
          const lng = map.getCenter().lng()
          console.log({ lat, lng })
          setLocation?.({ lat, lng })
        }}
      >
        <span className="absolute top-1/2 left-1/2 text-error font-extrabold -translate-x-1/2 -translate-y-1/2">
          <Icon name="location" />
        </span>
      </GoogleMap>
    </div>
  )
}
