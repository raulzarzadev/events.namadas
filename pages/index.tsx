import type { NextPage } from 'next';
import EventsRow from '@comps/events/eventsRow';
import useEvents from 'hooks/useEvents';
import { useSelector } from 'react-redux';
import { selectGeolocationState } from 'store/slices/geolocationSlice';
import { useEffect, useState } from 'react';
import { getVisibleCompanies } from '@firebase/Users/main';
import CompaniesRow from '@comps/CompaniesRow';
import useCompanies from 'hooks/useCompanies';


const Home: NextPage = () => {
  const { events: inProgress } = useEvents({ getByStatus: 'IN_PROGRESS' });
  const { events: activeEvents } = useEvents({ getByStatus: 'ACTIVE' });
  const { events: planingEvents } = useEvents({ getByStatus: 'PLANING' });
  const { events: finishedEvents } = useEvents({ getByStatus: 'FINISHED' });

  const { companies } = useCompanies();
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
      <CompaniesRow title="Companies " companies={companies} />
    </div>
  );
};

export default Home;
