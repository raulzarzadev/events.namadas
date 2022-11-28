import DateComponent from '@comps/DateComponent'
import DistanceFromUser from '@comps/DistanceFromUser'
import InputShare from '@comps/inputs/InputShare'
import RangeDate from '@comps/RangeDate'
import { Event as EventType } from '@firebase/Events/event.model'
import useAuth from 'hooks/useAuth'
import { fromNow } from 'utils/myFormatDate'
import EventOptions from '../EventOptions'

const EventDetailsHeader = ({ event }: { event: EventType }) => {
  const { id, includeFinishDate, address, location, title } = event
  const { user } = useAuth()
  const isOwner = user?.id === event?.userId
  return (
    <div>
      {isOwner && (
        <div>
          <EventOptions
            eventId={id ?? ''}
            config={{ deleteRedirectTo: '/profile' }}
          />
        </div>
      )}
      <div className="flex w-full justify-center">
        <InputShare
          text="Mira este evento"
          title={title}
          url={`https://events.nadamas.app/events/${id ?? ''}`}
        />
      </div>
      <p className="text-center">
        {includeFinishDate ? (
          <RangeDate
            finishAt={event.finishAt}
            startAt={event.date}
            format="dd MMMM"
          />
        ) : (
          <DateComponent date={event.date} format="dd MMMM yy" />
        )}
      </p>
      <p className="text-center">
        {event.date ? fromNow(event?.date, { addSuffix: true }) : ''}
      </p>
      {address && (
        <p className="text-center">
          {location?.address ?? address}
          <a
            target={'_blank'}
            href={`https://maps.google.com/?${
              location?.address
                ? `q=${location.address}`
                : `ll=${location?.lat ?? 0},${location?.lng ?? 0}`
            }`}
            className="link"
            rel="noreferrer"
          >
            {' map '}
          </a>
        </p>
      )}
      <DistanceFromUser location={location} />
    </div>
  )
}

export default EventDetailsHeader
