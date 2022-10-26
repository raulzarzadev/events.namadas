import PriceCard from "@comps/PriceCard";
import useEvents from "hooks/useEvents";
import Link from "next/link";
import { useRouter } from "next/router";

const BePartOf = () => {
  const {query:{id:eventId}}=useRouter()
  const {event}=useEvents({eventId:`${eventId}`})
  return (
    <div>
      <h2 className="text-2xl font-bold text-center">Be part of this event</h2>
      <div className="grid gap-2 p-2 grid-cols-2 max-w-2xl mx-auto ">
        {event?.prices?.map((price) => (
            <PriceCard price={price} />
        ))}
      </div>
    </div>
  );
}

export default BePartOf;