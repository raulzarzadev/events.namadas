import { Event } from '@firebase/Events/event.model';
import Image from 'next/image';
import Link from 'next/link';

export interface EventType extends Pick<Event, 'status'>{
  title: string;
  resume: string;
  id: string;
  image?: string;
  images?: EventImageType[];
  userId: string;
}

export interface EventImageType {
  url: string;
  src?: string;
  alt?: string;
  text?: string;
}

const EventCard = ({
  event,
  redirect = false,
  size = 'lg',
}: {
  redirect?: boolean;
  size?: 'sm' | 'md' | 'lg';
  event: EventType;
  onSuscribe?: (id: string) => {};
}) => {
  const { title, resume, id, image, images = [],status} = event;


  const firsImage = images?.[0];
  // console.log(firsImage);

  // FIX group-hover is not working
  const cutTestAt = (length: number, text: string = '') => {
    return text.slice(0, length).concat('...');
  };
  return (
    <Link href={`/events/${id}`}>
      <a className="w-[200px] ">
          <EventTitle title={title} />
        <figure className="relative w-full h-[115px] ">
          {firsImage && (
            <Image src={firsImage?.url} objectFit="cover" layout="fill" />
          )}

          <UpcommingLabel status={status}  />
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
//       <Link href={`/events/${id}`}>
//         <a>
//           <div
//             className={`card w-full ${sizing[size]} border-2 border-transparent  hover:border-primary cursor-pointer active:border-gray-600`}
//           >
//             <figure className="relative w-[400px] h-[225px] ">
//               {firsImage && (
//                 <Image src={firsImage?.url} objectFit="cover" layout="fill" />
//               )}
//             </figure>
//             <div className="card-body glass">
//               <h2 className="card-title">{title}</h2>
//               <p className="whitespace-pre-line">{cutTestAt(120, resume)}</p>
//               <div className="card-actions justify-end">
//                 <button className="btn btn-outline ">Saber más!</button>
//               </div>
//             </div>
//           </div>
//         </a>
//       </Link>
//     </div>
export default EventCard;
