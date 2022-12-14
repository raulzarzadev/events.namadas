import useAuth from 'hooks/useAuth'
import useEvents from 'hooks/useEvents'
import useEventsPayments from 'hooks/useEventsPayments'
import { useRouter } from 'next/router'
import PaymentsTable from './PaymentsTable'
import EventStats from './Stat'

const ManageEvent = () => {
  const {
    query: { id }
  } = useRouter()
  const eventId = typeof id === 'string' ? id : ''
  const { event } = useEvents({ eventId })
  const { user } = useAuth()
  const { eventPayments } = useEventsPayments({
    eventId,
    getEventPayments: true
  })
  if (user && user.id !== event?.userId)
    return <div>You have no access to this menu</div>
  return (
    <div className="text-center">
      <h1>Manage event</h1>
      <PaymentsTable eventPayments={eventPayments} />
      <EventStats />
    </div>
  )
}

export default ManageEvent
