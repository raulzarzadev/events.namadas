import DateComponent from '@comps/DateComponent';
import DistanceFromUser from '@comps/DistanceFromUser';
import RangeDate from '@comps/RangeDate';
import { Event } from '@firebase/Events/event.model';
import useAuth from 'hooks/useAuth';
import { fromNow } from 'utils/myFormatDate';
import EventOptions from '../EventOptions';

const EventDetailsHeader = ({ event }: { event: Event }) => {
  const { id, includeFinishDate, address, location } = event;
  const { user } = useAuth();
  const isOwner = (user && user.id) === event?.userId;
  return (
    <div>
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
      {address && (
        <p className="text-center">
          {location?.address || address}
          <a
            target={'_blank'}
            href={`https://maps.google.com/?${
              location?.address
                ? `q=${location.address}`
                : `ll=${location?.lat},${location?.lng}`
            }`}
            className="link"
          >
            {' map '}
          </a>
        </p>
      )}
      <DistanceFromUser location={location} />
    </div>
  );
};

export default EventDetailsHeader;
