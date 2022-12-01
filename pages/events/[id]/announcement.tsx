import { Event } from '@firebase/Events/event.model'
import { getEvent } from '@firebase/Events/main'
import { GetServerSidePropsContext } from 'next'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const eventId = context?.params?.id
  const event = typeof eventId === 'string' && (await getEvent(eventId))
  return {
    props: { event }
  }
}
const Announcement = ({ event }: { event: Event }) => {
  const announcement = event.announcement
  return (
    <div className="max-w-lg mx-auto">
      <p className="whitespace-pre-line truncate">{announcement}</p>
      announcement
    </div>
  )
}

export default Announcement
