import EventColCard from '@comps/EventColCard'
import { Event } from '@firebase/Events/event.model'

const EventsColumn = ({ events }: { events?: Event[] }) => {
  return (
    <div className="flex flex-col">
      {events?.map((event) => (
        <div key={event.id} className="mb-2 bg-base-200">
          <EventColCard event={event} />
        </div>
      ))}
    </div>
  )
}

export default EventsColumn
