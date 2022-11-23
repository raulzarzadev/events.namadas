import DateComponent from '@comps/DateComponent';
import { EventLinkInfo } from '@comps/events/event';
import EventOptions from '@comps/events/event/EventOptions';
import GeolocationInput from '@comps/inputs/GeolocationInput';
import ImagesList from '@comps/inputs/inputFiles_V2/imagesList';
import Modal from '@comps/modal';
import RangeDate from '@comps/RangeDate';
import { Coordinates, Event } from '@firebase/Events/event.model';
import useAuth from 'hooks/useAuth';
import useGeolocation from 'hooks/useGeolocation';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { fromNow } from 'utils/myFormatDate';
export interface EventType extends Event {}

const EventCard = ({
  event,
}: {
  redirect?: boolean;
  size?: 'sm' | 'md' | 'lg';
  event: EventType;
  onSubscribe?: (id: string) => {};
}) => {
  const { title, id, images = [], status } = event;
  const firsImage = images?.[0];
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };
  return (
    <>
      <a
        className="hover:scale-105 hover:z-10 transition-all group  w-[200px]"
        onClick={() => handleOpenModal()}
      >
        <EventTitle title={title} />
        <figure className="relative  w-[200px] h-[115px] ">
          {firsImage && (
            <Image
              src={firsImage?.url || firsImage?.src}
              objectFit="cover"
              layout="fill"
            />
          )}
          <div className="absolute bottom-0 right-1/2 translate-x-1/2">
            <EventLabel event={event} />
          </div>
        </figure>
        <p className="text-center">
          <span>
            {['FINISHED', 'ACTIVE', 'IN_PROGRESS'].includes(status) &&
              fromNow(event.date, { addSuffix: true })}
          </span>
          <span>{event.status === 'POSTPONED' && 'Event Postponed'}</span>
        </p>
      </a>
      <Modal title={`${title}`} open={openModal} handleOpen={handleOpenModal}>
        {openModal && (
          <div className="w-full mx-auto">
            <figure className="relative  w-full h-[165px]  ">
              {firsImage && (
                <Image
                  src={firsImage?.url || firsImage?.src}
                  objectFit="cover"
                  layout="fill"
                />
              )}
            </figure>

            <EventModalInfo event={event} />
          </div>
        )}
      </Modal>
    </>
  );
};

const EventModalInfo = ({ event }: { event: EventType }) => {
  const { id, resume, links, images, includeFinishDate, address, location } =
    event;
  const { user } = useAuth();
  const isOwner = (user && user.id) === event?.userId;
  return (
    <div className="">
      {isOwner && (
        <div>
          <EventOptions
            eventId={id || ''}
            config={{ deleteRedirectTo: '/profile' }}
          />
        </div>
      )}
      <p className="text-center">
        {includeFinishDate ? (
          <RangeDate
            finishAt={event.finishAt}
            startAt={event.date}
            format="dd MMMM"
          />
        ) : (
          <DateComponent date={event.date} format="dd MMMM yy" />
        )}
      </p>
      <p className="text-center">
        {event.date ? fromNow(event?.date, { addSuffix: true }) : ''}
      </p>
      {address && <p className="text-center">{address}</p>}
      <DistanceFromUser location={location} />
      <div className="w-full text-sm truncate text-center">
        <div className="flex w-full justify-between ">
          {/* <RatingInput /> */}
          <span></span>
          <Link href={`/events/${id}`}>
            <button className="btn btn-outline btn-circle">Go</button>
          </Link>
        </div>
      </div>
      {resume && (
        <div>
          <span className="text-xs">Resume</span>
          <p>{resume}</p>
          <div className="text-center">
            <Link href={`/events/${event.id}/announcement`}>
              <a className="link">Read full announcement</a>
            </Link>
          </div>
        </div>
      )}
      {!!links?.length && (
        <div>
          <span className="font-bold ">Some related links</span>
          <div className="flex w-full justify-around flex-wrap">
            {links?.map((link) => (
              <EventLinkInfo link={link} key={link.url} />
            ))}
          </div>
        </div>
      )}
      <div className="grid grid-cols-3 sm:grid-cols-4 ">
        <ImagesList
          images={images}
          childrenClassName={'w-full h-full '}
          showDelete={false}
        />
      </div>
    </div>
  );
};

const DistanceFromUser = ({ location }: { location?: Coordinates }) => {
  const { geolocation: userLocation, distanceBetween } = useGeolocation();
  if (!location) return <div>This event doesn't have location</div>;
  if (!userLocation)
    return (
      <div className="group text-center relative">
        <span className="group-hover:block hidden absolute -top-2 w-1/2 right-0 bg-info text-info-content rounded-lg shadow-md">
          Activate your geolocation to calculate distance to this event
        </span>
        <div className="flex justify-center w-full">
          <GeolocationInput />
        </div>
      </div>
    );
  const dist = distanceBetween(userLocation, location);
  return (
    <div className="text-center">
      <span>{dist} km</span>
    </div>
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

const EventLabel = ({ event }: { event: Event }) => {
  const currentTime = new Date().getTime();
  const LABELS = {
    postponed: (
      <div className="bg-warning px-2 rounded-t-lg">
        <label className="text-base-100 text-sm font-bold">Postponed</label>
      </div>
    ),
    upcoming: (
      <div className="bg-success px-2 rounded-t-lg">
        <label className="text-base-100 text-sm font-bold">Upcoming</label>
      </div>
    ),
    inCourse: (
      <div className="bg-info px-2 rounded-t-lg">
        <label className="text-base-100 text-sm font-bold">In course</label>
      </div>
    ),
    finished: (
      <div className="bg-error px-2 rounded-t-lg">
        <label className="text-base-100 text-sm font-bold">Finished</label>
      </div>
    ),
    null: <></>,
  } as const;
  type EventLabel = keyof typeof LABELS;

  const status = (): EventLabel => {
    if (event.status === 'POSTPONED') return 'postponed';
    if ((event?.date || 0) < currentTime) return 'finished';
    if ((event?.date || 0) > currentTime) return 'upcoming';
    if (
      event.includeFinishDate &&
      (event?.date || 0) > currentTime &&
      (event?.finishAt || 0) > currentTime
    )
      return 'inCourse';
    return 'null';
  };

  return LABELS[status()];
};

export default EventCard;
