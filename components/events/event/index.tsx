import Carousel from '@comps/carousel';
import { Event, SubEvent } from '@firebase/Events/event.model';
import { format } from 'date-fns';
import useAuth from 'hooks/useAuth';
import useEvents from 'hooks/useEvents';
import Link from 'next/link';
import { useRouter } from 'next/router';
import myFormatDate from 'utils/myFormatDate';


const Event = ({event}:{event:Event|null}) => {

  if (!event) return <div>Loading ...</div>;

  const { title,date, resume, userId, images, subEvents=[] } = event;
  return (
    <div>
      <Carousel images={images} />
      <div className="flex w-full justify-around my-4">
        <button className="btn btn-primary ">Participa</button>
       
      </div>
      <h1 className="text-center font-bold text-2xl">
        {title || 'Event title'}
      </h1>
      <p className="text-center">{date && myFormatDate(date)}</p>
      <p className="max-w-md mx-auto">{resume || 'Event resume'}</p>
      <div>
        <h3 className="font-bold text-lg">The events</h3>
        <div className="grid gap-2 p-1">
          {subEvents?.map((sub) => (
            <SubEvent key={sub.title} subEvent={sub} />
          ))}
        </div>
      </div>
    </div>
  );
};

const SubEvent = ({ subEvent }:{subEvent:SubEvent}) => {
  const { title, comments, distance, date } = subEvent;
  return (
    <div className="border p-1">
      <div className="flex w-full justify-between">
        <h3 className="w-1/3 ">{title}</h3>
        <span className="w-1/3 text-center">{distance}</span>
        <span className="w-1/3 text-end">{date&&myFormatDate(date)}</span>
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
