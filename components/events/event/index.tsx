import Carousel from '@comps/carousel'
import ImagesList from '@comps/inputs/inputFiles_V2/imagesList'
import PickerSwimmingTests from '@comps/inputs/PickerSwimmingTest_v2'
import PreviewImage from '@comps/previewImage'
import {
  Event as EventType,
  EventLink,
  SubEvent
} from '@firebase/Events/event.model'
import Link from 'next/link'
import SubEventInfo from '../FormEvent/SubEventSection_v2/SubEventInfo'
import EventDetailsHeader from './EventDetails/EventDetailsHeader'

const Event = ({ event }: { event: EventType | null | undefined }) => {
  // const { userEventPayments } = useEventsPayments({ eventId:event?.id });
  if (!event) return <div>Loading ...</div>

  const {
    title,
    resume,
    images,
    subEvents = [],
    swimmingType,
    eventType,
    id: eventId,
    announcement,
    links
  } = event

  const LABELS: Record<EventType['swimmingType'], string> = {
    '25m': 'Pool 25m',
    '50m': 'Pool 50m',
    openWater: 'Open Water',
    swimmingPool: 'Swimming pool'
  }

  return (
    <div>
      <Carousel images={images} />

      <div className="max-w-md mx-auto">
        <h1 className="text-center font-bold text-2xl">
          {title || 'Event title'}
        </h1>
        <EventDetailsHeader event={event} />

        <p className="text-center">{LABELS[swimmingType]}</p>
        {resume && (
          <>
            <h4 className="font-bold text-lg text-center">Event resume</h4>
            <p className=" mx-auto whitespace-pre-line">
              {resume || 'Event resume'}
            </p>
          </>
        )}

        {announcement && (
          <div className="text-center">
            <Link href={`${eventId ?? ''}/announcement`}>
              <a className="link text-center mx-auto">Read full announcement</a>
            </Link>
          </div>
        )}

        {!!subEvents.length && (
          <div>
            <h3 className="font-bold text-lg text-center">
              Sub events{' '}
              <span className="text-sm font-normal">
                {`(${subEvents.length || 0})`}
              </span>
            </h3>
            {eventType === 'swimmingPool' ? (
              <PickerSwimmingTests tests={subEvents} disabled />
            ) : (
              <div className="grid gap-2 p-1">
                {subEvents?.sort(sortByDate).map((subEvent: SubEvent, i) => (
                  <SubEventInfo
                    key={`${subEvent?.title ?? ''}-${i}`}
                    subEvent={subEvent}
                    index={i}
                    handleEdit={undefined}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {!!links?.length && (
          <div className="mb-2 ">
            <h4 className="font-bold text-lg text-center">Event Links</h4>
            <div className="flex  w-full justify-around flex-wrap">
              {links?.map((link) => (
                <EventLinkInfo key={link.url} link={link} />
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-cols-3 sm:grid-cols-4">
          <ImagesList images={images} />
        </div>
      </div>
    </div>
  )
}

const sortByDate = (a: any, b: any) => {
  if (a.date > b.date) return 1
  if (a.date < b.date) return -1
  return 0
}

export const EventLinkInfo = ({ link }: { link: EventLink }) => {
  return (
    <div className="my-4 p-2">
      {link.image && <PreviewImage image={link.image} showDelete={false} />}
      <Link href={link?.url} target="_blank">
        <a className="link w-1/3 text-center " target={'_blank'}>
          {link.label}
        </a>
      </Link>
    </div>
  )
}

export default Event
