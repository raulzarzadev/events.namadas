import Icon from '@comps/Icon'
import ModalDelete from '@comps/modal/ModalDelete_v2'
import { deleteEvent } from '@firebase/Events/main'
import Link from 'next/link'
import { useRouter } from 'next/router'

export interface EventOptionsConfig {
  deleteRedirectTo?: string
  iconsOnly?: boolean
}
const EventOptions = ({
  eventId,
  config
}: {
  eventId: string
  config?: EventOptionsConfig
}) => {
  const router = useRouter()
  const deleteRedirectTo = config?.deleteRedirectTo
  const iconsOnly = config?.iconsOnly
  const handleDeleteEvent = () => {
    // console.log(event?.id);
    if (eventId) {
      deleteEvent(eventId).then((res) => {
        deleteRedirectTo ? router.push(deleteRedirectTo) : router.back()
        console.log(res)
      })
    } else {
      console.log('no event id')
    }
  }

  return (
    <div
      className=" 
      flex w-full
      justify-evenly 
      max-w-lg 
      mx-auto 
      p-2
      "
    >
      <ModalDelete
        title={'Delete event'}
        handleDelete={handleDeleteEvent}
        openButtonProps={{
          'data-test-id': 'delete-event-option',
          className: `${
            iconsOnly ? 'btn btn-ghost btn-xs btn-circle mx-1' : ''
          }`
        }}
        buttonLabel={''}
      />
      <Link href={`/events/${eventId}/edit`}>
        {iconsOnly ? (
          <button className="btn btn-ghost btn-xs btn-circle mx-1 text-info">
            <Icon name="edit" />
          </button>
        ) : (
          <button className="btn btn-outline w-1/4 " data-test-id="edit-event">
            Edit{' '}
          </button>
        )}
      </Link>
      <Link href={`/events/${eventId}/manage`}>
        {iconsOnly ? (
          <button className="btn btn-ghost btn-xs btn-circle mx-1">
            <Icon name="gear" />
          </button>
        ) : (
          <button className="btn btn-outline w-1/4 ">Manage </button>
        )}
      </Link>
    </div>
  )
}

export default EventOptions
