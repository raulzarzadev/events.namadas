import DateComponent from '@comps/DateComponent';
import Icon from '@comps/Icon';
import ImagesList from '@comps/inputs/inputFiles_V2/imagesList';
import RatingInput from '@comps/inputs/RatingInput';
import Modal from '@comps/modal';
import RangeDate from '@comps/RangeDate';
import { Event } from '@firebase/Events/event.model';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import  { fromNow } from 'utils/myFormatDate';
export interface EventType extends Event {}

const EventColCard = ({
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
      <a className=" transition-all group  w-full ">
        <div className="flex justify-between p-2">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-slate-500 flex justify-center items-center">
              E
            </div>
            <div className="ml-2 text-sm ">
              <h2>{event.title}</h2>
              <p>{fromNow(event.date, { addSuffix: true })}</p>
            </div>
          </div>
          <div className="">
            <button className='btn btn-square btn-xs btn-ghost ' onClick={() => handleOpenModal()}>
              <Icon name="down" />
            </button>
          </div>
        </div>
        <div className="flex h-24 w-full ">
          <ImagesList images={[...images]} showDelete={false} />
        </div>
        <div className="flex w-full justify-between">
          <div className="flex ">
            <div className="flex items-center mx-2">
              <Icon name="user" /> <span>280</span>
            </div>
            <div className="flex items-center mx-2">
              <Icon name="group" /> <span>26</span>
            </div>
          </div>
          <div className="flex ">
            <div className="flex items-center mx-2">
              <Icon name="share" />
            </div>
            <div className="flex items-center mx-2">
              <Icon name="group" /> <span>26</span>
            </div>
          </div>
        </div>
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
    </div>
  );
};

const EventInfo = ({ when }: { when?: string }) => {
  return (
    <div className="">
      <div className="w-full text-sm truncate text-center">
        <label className=" ">{when}</label>
      </div>
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

export default EventColCard;
