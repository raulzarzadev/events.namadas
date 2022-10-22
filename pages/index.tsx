import type { NextPage } from 'next';
import EventsRow from '@comps/events/eventsRow';
import useEvents from 'hooks/useEvents';

const Home: NextPage = () => {
  const { events:activeEvents } = useEvents({ getByStatus: 'ACTIVE' });
  const { events:plaingEvents } = useEvents({ getByStatus: 'PLANING' });
  // console.log(plaingEvents);
  return (
    <div className='px-2'>
      {/* <Hero /> */}
      {/* <EventsFilter /> */}
      <EventsRow title='Upcomming events ' events={activeEvents} />
      <EventsRow title='Planing events' events={plaingEvents} />
    </div>
  );
};

export default Home;
