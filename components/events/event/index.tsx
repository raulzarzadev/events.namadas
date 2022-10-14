import Carousel from '@comps/carousel';
import { Event } from '@firebase/Events/event.model';
import useAuth from 'hooks/useAuth';
import useEvents from 'hooks/useEvents';
import { useRouter } from 'next/router';
import { EventType } from '../eventsList/EventCard';

const Event = () => {
  const {
    query: { id: eventId },
  } = useRouter();
  const { event } = useEvents({ eventId });
  const { user } = useAuth();

  if (!event) return <div>Loading ...</div>;

  const { title, resume, userId, images, subEvents } = event;
  const isOwner = userId === user?.id;
  console.log(event);
  return (
    <div>
      <Carousel images={images} />
      <div className="flex w-full justify-around my-4">
        <button className="btn btn-primary ">Participa</button>
        {isOwner && <button className="btn btn-outline ">Manage </button>}
      </div>
      <h1 className="text-center font-bold text-2xl">
        {title || 'Event title'}
      </h1>
      <p className="max-w-md mx-auto">{resume || 'Event resume'}</p>
      <div>
        <h3 className="font-bold text-lg">The events</h3>
        <div className='grid gap-2 p-1'>
          {subEvents.map((sub) => (
            <SubEvent key={sub.title} subEvent={sub} />
          ))}
        </div>
      </div>
    </div>
  );
};

const SubEvent = ({ subEvent }) => {
  const { title, comments, distance, date } = subEvent;
  return (
    <div className="border p-1">
      <div className='flex w-full justify-between'>
        <h3 className='w-1/3 '>{title}</h3>
        <span className='w-1/3 text-center'>{distance}</span>
        <span className='w-1/3 text-end'>{date}</span>
      </div>
      <div>
        <p>{comments}</p>
      </div>
    </div>
  );
};

export default Event;

const EVENT: Event = {
  userId: '',
  id: '1',
  resume: `Nostrud minim adipisicing ea ipsum aliquip occaecat voluptate occaecat eu enim pariatur laboris amet. Ex officia elit adipisicing veniam amet anim anim adipisicing irure enim. Esse commodo minim ex consectetur ex aute duis minim duis.
      Amet qui reprehenderit nulla et sit. Id do pariatur Lorem magna incididunt laborum aliqua. Sit et sint ut reprehenderit aliquip qui nostrud minim. Tempor in id minim id.`,
  title: 'Title of the event',
  image: '',
  images: [
    {
      src: 'https://placeimg.com/400/225/arch',
      alt: 'the image of the event',
    },
    {
      src: 'https://placeimg.com/400/225/arch',
      alt: 'the image of the event',
    },
  ],
};
