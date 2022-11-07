import type { NextPage } from 'next';
import EventsRow from '@comps/events/eventsRow';
import useEvents from 'hooks/useEvents';
import { useSelector } from 'react-redux';
import { selectGeolocationState } from 'store/slices/geolocationSlice';
import { useEffect, useState } from 'react';
import { getVisibleCompanies } from '@firebase/Users/main';
import CompaniesRow from '@comps/CompaniesRow';
import useCompanies from 'hooks/useCompanies';
import Breadcrumb from '@comps/Breadcrumb';
import { Event } from '@firebase/Events/event.model';

const isInProgress = (event: Event): boolean => {
  const currentDate = new Date().getTime();
  console.log(event);
  return (
    event?.includeFinishDate &&
    event?.date < currentDate &&
    event?.finishAt > currentDate
  );
};
const isPastEvent = (event: Event): boolean => {
  const currentDate = new Date().getTime();
  return event.includeFinishDate
    ? event?.finishAt < currentDate
    : event?.date < currentDate;
};
const Home: NextPage = () => {
  // const { events: inProgress } = useEvents({ getByStatus: 'IN_PROGRESS' });
  // const { events: activeEvents } = useEvents({ getByStatus: 'ACTIVE' });
  // const { events: planingEvents } = useEvents({ getByStatus: 'PLANING' });
  // const { events: finishedEvents } = useEvents({ getByStatus: 'FINISHED' });
  const { events } = useEvents({ getAllEvents: true });
  const { companies } = useCompanies();
  const geolocation = useSelector(selectGeolocationState);
  const inProgress: Event[] = [...events].filter((event) =>
    isInProgress(event)
  );
  const pastEvents: Event[] = [...events].filter((event) => isPastEvent(event));
  const activeEvents: Event[] = [...events].filter(
    (event) => event.status === 'ACTIVE' && !isPastEvent(event)
  );
  const planingEvents: Event[] = [...events].filter(
    (event) => event.status === 'PLANING'
  );
  const nearYou: Event[] = [];
  // console.log(inProgress);
  return (
    <div className="px-2">
      {/* <Hero /> */}
      {/* <EventsFilter /> */}
      {/* <EventsRow title="Events in progress now " events={inProgress} /> */}
      {/* <EventsRow
        title="Near you"
        events={nearYou}
        iconName={geolocation ? 'location' : 'hideLocation'}
        subtitle={geolocation ? '' : 'allow geolocation to see events'}
      /> */}
      <EventsRow title="Upcoming events " events={activeEvents} />
      {/* <EventsRow title="Planing events" events={planingEvents} /> */}
      <EventsRow title="Past events" events={pastEvents} />
      {/* <CompaniesRow title="Companies " companies={companies} /> */}
    </div>
  );
};

export default Home;
