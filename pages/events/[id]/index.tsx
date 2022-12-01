import Event from '@comps/events/event'
import JoinEvent from '@comps/JoinEvent'
import { Event as EventType } from '@firebase/Events/event.model'
import { getEvent } from '@firebase/Events/main'

const EventPage = ({ event }: { event?: EventType }) => {
  if (event === undefined) return <div>Loading...</div>
  if (event === null) return <div>This element is not visible...</div>

  return (
    <div className="mb-20">
      <Event event={event} />
      {event?.subscriptionsOptions?.acceptSubscriptions && (
        <JoinEvent event={event} />
      )}
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const eventId = context.params.id
  const event = await getEvent(eventId)
  return {
    props: {
      event
    }
  }
}

export default EventPage
