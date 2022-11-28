// import FormEvent from '@comps/events/FormEvent'
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

const Edit = (props: { event: Event }) => {
  const event = props.event
  if (!event) return <div>Loading ...</div>
  return <>{/* <FormEvent event={event} /> */}</>
}

export default Edit
