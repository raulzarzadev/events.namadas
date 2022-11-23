import type { NextPage } from 'next';
import { getPublicEvents } from '@firebase/Events/main';
import HomeEvents from '@comps/events/homeEvents';

export async function getServerSideProps() {
  const events = await getPublicEvents();
  return {
    props: { events }, // will be passed to the page component as props
  };
}

const Home: NextPage = (props: any) => {
  const events = props?.events;

  return (
    <div className="px-2">
      <HomeEvents events={events} />
    </div>
  );
};

export default Home;
