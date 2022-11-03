import type { NextPage } from 'next';
import EventsRow from '@comps/events/eventsRow';
import useEvents from 'hooks/useEvents';
import { useSelector } from 'react-redux';
import { selectGeolocationState } from 'store/slices/geolocationSlice';


const Home: NextPage = () => {
  const { events: inProgress } = useEvents({ getByStatus: 'IN_PROGRESS' });
  const { events: activeEvents } = useEvents({ getByStatus: 'ACTIVE' });
  const { events: planingEvents } = useEvents({ getByStatus: 'PLANING' });
  const { events: finishedEvents } = useEvents({ getByStatus: 'FINISHED' });
  // console.log(planingEvents);
  const geolocation = useSelector(selectGeolocationState)
  return (
    <div className="px-2">
      {/* <Hero /> */}
      {/* <EventsFilter /> */}
      <EventsRow title="Events in progress now " events={inProgress} />
      <EventsRow
        title="Near you"
        events={finishedEvents}
        iconName={geolocation ? 'location' : 'hideLocation'}
        subtitle={geolocation ? '' : 'allow geolocation to see events'}
      />
      <EventsRow title="Upcoming events " events={activeEvents} />
      <EventsRow title="Planing events" events={planingEvents} />
      <EventsRow title="Past events" events={finishedEvents} />
    </div>
  );
};

export default Home;
