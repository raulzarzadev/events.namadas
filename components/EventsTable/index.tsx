/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Event, Event as EventType } from '@firebase/Events/event.model'
import { useTable, useSortBy } from 'react-table'
import { useMemo } from 'react'
import { formatEventsForTable } from './utils.table'
import myFormatDate, { fromNow } from 'utils/myFormatDate'
import Link from 'next/link'
import Icon from '@comps/Icon'

const actionsFormatter = (value: Event['id']) => {
  return (
    <div>
      <Link href={`/events/${value}/edit`}>
        <Icon name="edit" />
      </Link>
    </div>
  )
}
const EventsTable = ({ events }: { events: EventType[] }) => {
  const formattedData = formatEventsForTable(events, [
    { fieldName: 'title' },
    { fieldName: 'address' },
    {
      fieldName: 'createdAt',
      formatter: (date) => fromNow(date),
      label: 'created'
    },
    { fieldName: 'date', formatter: (date) => myFormatDate(date, 'dd MMM yy') },
    { fieldName: 'id', label: 'Actions', formatter: actionsFormatter }
    // { fieldName: 'labels', formatter: labelsFormatter }
  ])

  const data = useMemo(() => formattedData.rows, [events])
  const columns = useMemo(() => [...formattedData.headers], [events])

  const tableInstance = useTable(
    {
      columns,
      data
    },
    useSortBy
  )
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance

  return (
    <div className="overflow-auto">
      <h3 className="text-center font-bold text-xl">All events </h3>
      <table {...getTableProps()} className={'table table-compact mx-auto'}>
        <thead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              // eslint-disable-next-line react/jsx-key
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    // eslint-disable-next-line react/jsx-key
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {
                        // Render the header
                        column.render('Header')
                      }
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ''}
                      </span>
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row)
              return (
                // Apply the row props
                // eslint-disable-next-line react/jsx-key
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        // eslint-disable-next-line react/jsx-key
                        <td {...cell.getCellProps()}>
                          <div className="max-w-[160px] truncate">
                            {cell.value}
                            {/* {
                              // Render the cell contents
                              cell.render('Cell')
                            } */}
                          </div>
                        </td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {/* <table className="table table-compact table-fixed mx-auto ">
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
      </table> */}
    </div>
  )
}

export default EventsTable
