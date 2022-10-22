import FormEvent from '@comps/events/formEventV2'
import useEvents from 'hooks/useEvents'
import { useRouter } from 'next/router'

const Edit = () => {
  
  const {query:{id:eventId}}=useRouter()
  const { event } = useEvents({ eventId : `${eventId}`});
  if(!event) return <div>Loading ...</div>
  return (
    <div>
      <FormEvent event={event}/>
    </div>
  )
}

export default Edit
