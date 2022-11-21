import type { NextPage } from 'next';
import EventsRow from '@comps/events/eventsRow';
import useEvents from 'hooks/useEvents';
import { Event } from '@firebase/Events/event.model';
import { getPublicEvents } from '@firebase/Events/main';
import HomeEvents from '@comps/events/homeEvents';

const isPastEvent = (event: any): boolean => {
  const currentDate = new Date().getTime();
  return event.includeFinishDate
    ? event?.finishAt < currentDate
    : event?.date < currentDate;
};

export async function getServerSideProps() {
  const events = await getPublicEvents();
  return {
    props: { events }, // will be passed to the page component as props
  };
}

const Home: NextPage = (props: any) => {
  const events = props?.events;
  //const { events } = useEvents({ getAllEvents: true });

  return (
    <div className="px-2">
      <HomeEvents events={events} />
    </div>
  );
};

export default Home;
