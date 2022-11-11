import DateComponent from '@comps/DateComponent';
import EventOptions from '@comps/events/event/EventOptions';
import RatingInput from '@comps/inputs/RatingInput';
import Modal from '@comps/modal';
import RangeDate from '@comps/RangeDate';
import { Event } from '@firebase/Events/event.model';
import useAuth from 'hooks/useAuth';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { fromNow } from 'utils/myFormatDate';
export interface EventType extends Event { }

const EventCard = ({
  event,
}: {
  redirect?: boolean;
  size?: 'sm' | 'md' | 'lg';
  event: EventType;
  onSubscribe?: (id: string) => {};
}) => {
  const {
    title,
    id,
    images = [],
    status,
    date,
    includeFinishDate,
    finishAt,
  } = event;
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
          <UpcomingLabel status={status} />
        </figure>
        <p className="text-center">
          {fromNow(event.date, { addSuffix: true })}
        </p>
      </a>
      <Modal title={`${title}`} open={openModal} handleOpen={handleOpenModal}>
        <div className="w-full mx-auto">
          <figure className="relative  w-full h-[165px]  ">
            {firsImage && (
              <Image
                src={firsImage?.url || firsImage?.src}
                objectFit="cover"
                layout="fill"
              />
            )}
            <UpcomingLabel status={status} />
          </figure>
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

          <EventModalInfo event={event} />
        </div>
      </Modal>
    </>
  );
};

const EventModalInfo = ({ event }: { event: EventType }) => {
  const { id, resume, links } = event;
  const { user } = useAuth()
  const isOwner = (user && user.id) === event?.userId;
  return (
    <div className="">
      <p>{fromNow(event.date, { addSuffix: true })}</p>
      <div className="w-full text-sm truncate text-center">
        <div className="flex w-full justify-between ">
          <RatingInput />
          <Link href={`/events/${id}`}>
            <button className="btn btn-outline btn-circle">Go</button>
          </Link>
        </div>
      </div>
      {!!links?.length && (
        <div>
          <span className="text-xs">visit</span>
          <div className="flex w-full justify-around">
            {links?.map((link) => (
              <div key={link.url}>
                <Link href={link.url} target="_blank">
                  <a className="link">{link.label}</a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
      {resume && (
        <div>
          <span className="text-xs">Description</span>
          <p>{resume}</p>
        </div>
      )}
      {isOwner &&
        <div><EventOptions eventId={id || ''} config={{ deleteRedirectTo: '/profile' }} /></div>}
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

const UpcomingLabel = ({
  status = 'PLANING',
  fromNow,
}: {
  status: Event['status'];
  fromNow?: string;
}) => {
  const STATUS_LABEL: Record<Event['status'], string> = {
    ACTIVE: 'Upcoming',
    PLANING: 'Coming soon',
    IN_PROGRESS: 'In progress',
    FINISHED: 'Finished',
  };
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 ">
      <div className="flex justify-center">
        <label className="bg-red-600 font-bold rounded-t-md p-1 pb-0 text-sm whitespace-nowrap">
          {STATUS_LABEL[status]} {fromNow && `in ${fromNow}`}
        </label>
      </div>
    </div>
  );
};

export default EventCard;
