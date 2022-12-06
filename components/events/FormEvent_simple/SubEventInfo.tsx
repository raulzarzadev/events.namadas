import { CurrencySpan } from '@comps/CurrencySpan'
import Icon from '@comps/Icon'
import { SubEvent } from '@firebase/Events/event.model'
import Link from 'next/link'
import myFormatDate from 'utils/myFormatDate'

const SubEventInfo = ({
  subEvent,
  index
}: {
  subEvent: SubEvent
  index: number
}) => {
  const {
    comments,
    date,
    description,
    distance,
    finishAt,
    price,
    style,
    location,
    link
  } = subEvent

  const formatDistance = (distance: number | string) => {
    const dist = parseFloat(`${distance}`)
    if (dist < 1000) return `${dist} mts`
    if (dist >= 1000) return `${dist / 1000} Kms`
  }

  return (
    <div className="p-1 bg-base-200 rounded-lg">
      <div className="flex w-full justify-between items-center">
        <div>
          {date && <span> {myFormatDate(date, 'dd-MMM-yy')} </span>}
          {finishAt && <span>to: {myFormatDate(finishAt, 'dd-MMM-yy')}</span>}
        </div>
        <div className="grid text-end pr-2">
          {style && <span>{style}</span>}
          {price && <CurrencySpan value={price} />}
          {distance && <span>{formatDistance(distance)}</span>}
        </div>
      </div>
      <div>
        {description && <p className="whitespace-pre-line">{description}</p>}
        {<span>{comments}</span> && <p>{<span>{comments}</span>}</p>}
        {link && (
          <div className="text-end mr-2">
            <a href={link} target="_blank" className="link" rel="noreferrer">
              see more
            </a>
          </div>
        )}
      </div>
      {location && (
        <div className="flex  justify-center">
          <Link
            href={`https://maps.google.com/?${
              location?.address
                ? `q=${location.address}`
                : `ll=${location?.lat},${location?.lng}`
            }`}
          >
            <a className="link flex " target={'_blank'}>
              {location?.address ?? 'location'}
              <span>
                <Icon name="location" />
              </span>
            </a>
          </Link>
        </div>
      )}
    </div>
  )
}

export default SubEventInfo
