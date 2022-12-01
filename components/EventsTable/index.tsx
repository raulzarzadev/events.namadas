/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Icon from '@comps/Icon'
import ModalDelete from '@comps/modal/ModalDelete_v2'
import { Event as EventType } from '@firebase/Events/event.model'
import useSortByField from 'hooks/useSortByField'
import Link from 'next/link'
import myFormatDate, { fromNow } from 'utils/myFormatDate'

const EventsTable = ({ events }: { events: EventType[] }) => {
  const handleDeleteEvent = (id?: string) => {
    console.log(id, 'delete')
  }
  const { arraySorted: sortedEvents, handleSortBy } = useSortByField(events)

  return (
    <div className="overflow-auto">
      <h3 className="text-center font-bold text-xl">All events </h3>
      <table className="table table-compact table-fixed mx-auto ">
        <thead>
          <tr>
            <th className="w-10">
              <button
                onClick={() => {
                  handleSortBy('title')
                }}
              >
                Event
              </button>
            </th>
            <th>
              <button
                onClick={() => {
                  handleSortBy('Date')
                }}
              >
                Date
              </button>
            </th>
            <th>
              <button
                onClick={() => {
                  handleSortBy('createdAt')
                }}
              >
                Created
              </button>
            </th>
            <th>
              <button
                onClick={() => {
                  handleSortBy('status')
                }}
              >
                Status
              </button>
            </th>

            <th>Ops</th>
          </tr>
        </thead>
        <tbody>
          {sortedEvents.map((event) => (
            <tr key={event.id}>
              <td className="truncate">
                <div className="w-[120px] truncate">{event.title}</div>
              </td>
              <td>{myFormatDate(event.date, 'dd-MM-yy')}</td>
              <td>{fromNow(event.createdAt)}</td>
              <td>
                <div className="w-[80px] truncate">{event?.status}</div>
              </td>
              <td>
                <div>
                  <Link href={`/events/${event.id}`}>
                    <a className="btn btn-xs btn-circle btn-ghost btn-info">
                      <Icon name="edit" />
                    </a>
                  </Link>
                  <ModalDelete
                    handleDelete={() => {
                      handleDeleteEvent(event.id)
                    }}
                    buttonLabel={null}
                    openButtonProps={{
                      className: 'btn btn-xs btn-circle btn-ghost'
                    }}
                    title={'Delete event'}
                  ></ModalDelete>
                </div>
              </td>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table>
    </div>
  )
}

export default EventsTable
