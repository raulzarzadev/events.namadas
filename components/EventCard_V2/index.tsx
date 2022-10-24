import { Event } from '@firebase/Events/event.model';
import Image from 'next/image';
import Link from 'next/link';
export interface EventType extends Event{
}

const EventCard = ({
  event,
}: {
  redirect?: boolean;
  size?: 'sm' | 'md' | 'lg';
  event: EventType;
  onSuscribe?: (id: string) => {};
}) => {
  const { title, id,  images = [],status} = event;
  const firsImage = images?.[0];

  return (
    <Link href={`/events/${id}`}>
      <a className="">
        <EventTitle title={title} />
        <figure className="relative w-[200px]  h-[115px] ">
          {firsImage && (
            <Image
              src={firsImage?.url || firsImage?.src}
              objectFit="cover"
              layout="fill"
            />
          )}
          <UpcommingLabel status={status} />
        </figure>
      </a>
    </Link>
  );
};

const EventTitle = ({ title }: { title?: string }) => {
  return (
    <div className="">
      <div className="w-full text-sm truncate text-center">
        <label className=" ">{title}</label>
      </div>
    </div>
  );
};

const UpcommingLabel = ({
  status = 'PLANING',
  fromNow,
}: {
  status: Event['status'];
  fromNow?: string;
}) => {
  const STATUS_LABEL: Record<Event['status'], string> = {
    ACTIVE: 'Upcomming',
    PLANING: 'Comming soon',
    IN_PROGRESS: 'In progress',
    FINISHED: 'Finished',
  };
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 ">
      <div className="flex justify-center">
        <label className="bg-red-600 font-bold rounded-t-md p-1 pb-0 text-sm whitespace-nowrap" >
          {STATUS_LABEL[status]} {fromNow && `in ${fromNow}`}
        </label>
      </div>
    </div>
  );
};

export default EventCard;
