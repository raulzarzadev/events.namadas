import EventCard, { EventType } from '@comps/EventCard_V2'
import useEvents from 'hooks/useEvents'

const EventsList = () => {
  const { userEvents } = useEvents({})
  const handleSubscribeTo = (id: string) => {
    return ''
  }
  return (
    <div className="max-w-xl mx-auto">
      <h3 className="text-2xl text-center font-bold my-4 ">Events</h3>
      <div className="grid ">
        <div className="grid grid-flow-col gap-1 overflow-x-auto pb-4 ">
          {userEvents.map((event: EventType) => (
            <EventCard
              size="sm"
              event={event}
              key={event?.id}
              onSubscribe={handleSubscribeTo}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default EventsList
