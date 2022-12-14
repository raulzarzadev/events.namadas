import EventCard, { EventType } from '@comps/EventCard_V2'
import Icon from '@comps/Icon'
import { IconName } from '@comps/Icon/icons-list'
import { sortFromNow } from 'utils/myFormatDate'

const EventsRow = ({
  events,
  title = 'Events',
  iconName,
  subtitle
}: {
  events: EventType[]
  title: string
  iconName?: IconName
  subtitle?: string
}) => {
  return (
    <div className=" mx-auto w-full ">
      <div className="flex items-end ">
        <h3 className="text-lg  font-bold mt-1 ">{title}</h3>
        {subtitle && <span className="mb-1 text-xs mx-1">{subtitle}</span>}
        {iconName && (
          <span className="mb-1">
            <Icon name={iconName} />
          </span>
        )}
      </div>
      <div className="grid ">
        {!!events.length && (
          <div className="flex flex-row gap-2 overflow-x-auto overflow-y-hidden  h-[175px] ">
            {events?.sort(sortFromNow).map((event, i) => (
              <EventCard key={event?.id} size="sm" event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default EventsRow
