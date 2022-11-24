import type { NextPage } from 'next';
import { getPublicEvents } from '@firebase/Events/main';
import HomeEvents from '@comps/events/homeEvents';
import Link from 'next/link';

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
      <div className="text-center">
        <Link href={'/new-event'}>
          <a>Add event by free</a>
        </Link>
      </div>
      <HomeEvents events={events} />
    </div>
  );
};

export default Home;
