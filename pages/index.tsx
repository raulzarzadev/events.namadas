import type { NextPage } from 'next';
import Hero from '@comps/hero';
import EventsFilter from '@comps/eventsFilter';
import EventsList from '@comps/events/eventsList';

const Home: NextPage = () => {
  return (
    <div>
      <Hero />
      <EventsFilter />
      <EventsList />
    </div>
  );
};

export default Home;
