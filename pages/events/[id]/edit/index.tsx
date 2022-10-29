import FormEvent from '@comps/events/formEvent_V3'
import useEvents from 'hooks/useEvents'
import { useRouter } from 'next/router'
const Edit = () => {
  const {query:{id:eventId}}=useRouter()
  const { event } = useEvents({ eventId : `${eventId}`});
  if(!event) return <div>Loading ...</div>
  return (
    <FormEvent event={event}/>
  )
}

export default Edit
