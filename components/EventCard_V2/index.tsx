import { EventLinkInfo } from '@comps/events/event'
import EventDetailsHeader from '@comps/events/event/EventDetails/EventDetailsHeader'
import ImagesList from '@comps/inputs/inputFiles_V2/imagesList'
import Modal from '@comps/modal'
import { Event } from '@firebase/Events/event.model'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { fromNow } from 'utils/myFormatDate'
export interface EventType extends Event {}

const EventCard = ({
  event
}: {
  redirect?: boolean
  size?: 'sm' | 'md' | 'lg'
  event: EventType
  onSubscribe?: (id: string) => {}
}) => {
  const { title, images = [], status } = event
  const firsImage = images?.[0]?.url ?? images?.[0]?.src
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }
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
              src={firsImage}
              objectFit="cover"
              layout="fill"
              placeholder="blur"
              blurDataURL={firsImage}
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
                  src={firsImage || firsImage}
                  objectFit="cover"
                  layout="fill"
                  placeholder="blur"
                  blurDataURL={firsImage}
                />
              )}
            </figure>

            <EventModalInfo event={event} />
          </div>
        )}
      </Modal>
    </>
  )
}

const EventModalInfo = ({ event }: { event: EventType }) => {
  const { id, resume, links, images } = event
  return (
    <div className="">
      <EventDetailsHeader event={event} />
      <div className="w-full text-sm truncate text-center">
        <div className="flex w-full justify-between ">
          {/* <RatingInput /> */}
          <span></span>
          <Link href={`/events/${id ?? ''}`}>
            <button className="btn btn-outline btn-circle">Go</button>
          </Link>
        </div>
      </div>
      {resume && (
        <div>
          <span className="text-xs">Resume</span>
          <p>{resume}</p>
          <div className="text-center">
            <Link href={`/events/${event?.id ?? ''}/announcement`}>
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
  )
}

const EventTitle = ({ title }: { title?: string }) => {
  return (
    <div className="">
      <div className="w-full text-sm truncate text-center">
        <label className=" ">{title}</label>
      </div>
    </div>
  )
}

const EventLabel = ({ event }: { event: Event }) => {
  const currentTime = new Date().getTime()
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
    null: <></>
  } as const
  type EventLabel = keyof typeof LABELS

  const status = (): EventLabel => {
    if (event.status === 'POSTPONED') return 'postponed'
    if ((event?.date ?? 0) < currentTime) return 'finished'
    if ((event?.date ?? 0) > currentTime) return 'upcoming'
    if (
      event.includeFinishDate &&
      (event?.date ?? 0) > currentTime &&
      (event?.finishAt ?? 0) > currentTime
    )
      return 'inCourse'
    return 'null'
  }

  return LABELS[status()]
}

export default EventCard
