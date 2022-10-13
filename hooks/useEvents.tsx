import { listenEvent } from "@firebase/Events/main"
import { SetStateAction, useEffect, useState } from "react"

function useEvents({eventId}){
  const [event, setEvent]=useState(undefined)
  useEffect(()=>{
    if(eventId){
      listenEvent(eventId, (res: SetStateAction<undefined>)=>{
        setEvent(res)
      })
    }

  },[eventId])

  
  return {event}
}

export default useEvents