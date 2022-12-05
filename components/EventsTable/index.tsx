/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Event, Event as EventType } from '@firebase/Events/event.model'
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useAsyncDebounce
} from 'react-table'
import { useMemo, useState } from 'react'
import {
  formatEventsForTable,
  formatValueAfterPropsTableCreated,
  Titles
} from './utils.table'
import EventOptions from '@comps/events/event/EventOptions'
import Icon from '@comps/Icon'

const actionsFormatter = (value: Event['id']) => {
  return (
    <div>
      <EventOptions eventId={value} config={{ iconsOnly: true }} />
    </div>
  )
}

const COLS_CONFIG: Titles[] = [
  { fieldName: 'title' },
  { fieldName: 'address' },
  {
    fieldName: 'createdAt',
    // formatter: (date) => fromNow(date),
    label: 'created'
  },
  {
    fieldName: 'date'
    // formatter: (date) => myFormatDate(date, 'dd MMM yy')
  },
  { fieldName: 'id', label: 'Actions', formatter: actionsFormatter }
]

const EventsTable = ({ events }: { events: EventType[] }) => {
  const formattedData = formatEventsForTable(events, COLS_CONFIG)

  const data = useMemo(() => formattedData.rows, [events])
  const columns = useMemo(() => [...formattedData.headers], [events])

  const tableInstance = useTable(
    {
      columns,
      data
    },
    useGlobalFilter,
    useSortBy
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    preGlobalFilteredRows,
    state,
    setGlobalFilter
  } = tableInstance

  return (
    <div className="overflow-auto">
      <h3 className="text-center font-bold text-xl">All events </h3>
      <div className="flex w-full justify-center my-3">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
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
                      <div className="flex item-center">
                        {
                          // Render the header
                          column.render('Header')
                        }
                        <span className=" flex items-center">
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <Icon name="down" size="xs" />
                            ) : (
                              <Icon name="up" size="xs" />
                            )
                          ) : (
                            ''
                          )}
                        </span>
                      </div>
                    </th>
                  ))
                }
              </tr>
            ))
          }
          {/* Global filter search */}
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
                      const formattedCellValue =
                        formatValueAfterPropsTableCreated(
                          cell.value,
                          cell.column.Header
                        )
                      return (
                        // eslint-disable-next-line react/jsx-key
                        <th {...cell.getCellProps()} className="font-normal">
                          <div className="max-w-[160px] truncate">
                            {formattedCellValue}
                            {/* {
                              // Render the cell contents
                              cell.render('Cell')
                            } */}
                          </div>
                        </th>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter
}: any) => {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = useState(globalFilter)
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <span>
      Search:{' '}
      <input
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
        placeholder={`${count} records...`}
        className="input input-sm mx-auto input-bordered"
      />
    </span>
  )
}

export default EventsTable
