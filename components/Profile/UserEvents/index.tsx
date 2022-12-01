import PaymentCard from '@comps/PaymentCard'
import { listenUserEventsPayments } from '@firebase/EventPayments/main'
import { useEffect, useState } from 'react'
import { sortFromNow } from 'utils/myFormatDate'

const UserEvents = () => {
  useEffect(() => {
    listenUserEventsPayments((res: any) => setUpcomingEvents(res))
  }, [])

  const [upcomingEvents, setUpcomingEvents] = useState([])
  // console.log(upcomingEvents);
  return (
    <div>
      <p className="text-left font-bold mt-4">
        Events where you, as athlete has been
      </p>
      <div className="grid ">
        <div className="flex flex-row gap-2 overflow-x-auto pb-4 min-h-[115px] ">
          {upcomingEvents?.sort(sortFromNow)?.map((payment: any) => (
            <PaymentCard key={payment?.id} size="sm" payment={payment} />
          ))}
        </div>
      </div>
      {/* <EventsRow events={userEventPayments} title='Subscribed events'/>   */}
    </div>
  )
}

export default UserEvents
