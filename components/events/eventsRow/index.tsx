import EventCard, { EventType } from '@comps/EventCard_V2';
import Icon from '@comps/Icon';
import { IconName } from '@comps/Icon/icons-list';
import { sortFromNow } from 'utils/myFormatDate';

const EventsRow = ({
  events,
  title = 'Events',
  iconName,
  subtitle,
}: {
  events: EventType[];
  title: string;
  iconName?: IconName;
  subtitle?:string;
}) => {
  return (
    <div className=" mx-auto">
      <div className="flex items-end ">
        <h3 className="text-lg  font-bold mt-4 ">{title}</h3>
        {iconName && (
          <span className="mb-1">
            <Icon name={iconName} />
          </span>
        )}
        {subtitle && <span className='mb-1 text-xs mx-1'>{subtitle}</span>}
      </div>
      <div className="grid ">
        <div className="flex flex-row gap-2 overflow-x-auto pb-4 h-[185px] ">
          {events?.sort(sortFromNow).map((event) => (
            <EventCard key={event?.id} size="sm" event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsRow;
