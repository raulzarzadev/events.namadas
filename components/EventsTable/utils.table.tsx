import { Event as EventType } from '@firebase/Events/event.model'
import myFormatDate, { fromNow } from 'utils/myFormatDate'

export type Headers = Array<{ Header: string; accessor: string }>
export type Rows = Array<Record<string, string>>
export interface Titles {
  fieldName: keyof EventType
  label?: string
  formatter?: (value: any) => any
}

export const formatEventsForTable = (
  events: EventType[],
  colsTitles: Titles[]
): {
  rows: Rows
  headers: Headers
} => {
  // const cols: Titles[] = ['title', 'resume', 'date', 'createdAt']
  const ACCESSOR = 'col' // accessor is the "key" in the data

  const rows = events.map((event: EventType) => {
    const formatted: any = {}
    colsTitles.forEach(
      ({ fieldName, formatter }, i) =>
        (formatted[`${ACCESSOR}${i}`] =
          formatter?.(event[fieldName]) || event[fieldName])
    )
    return { ...formatted }
  })

  const headers: Headers = colsTitles.map(({ label, fieldName }, i) => {
    return {
      Header: label ?? fieldName,
      accessor: `${ACCESSOR}${i}`
    }
  })

  return { rows, headers }
}

export const formatValueAfterPropsTableCreated = (value: any, column: any) => {
  console.log(column)
  if (column === 'date') {
    return myFormatDate(value, 'dd-MMM-yy')
  }
  if (column === 'created') {
    return fromNow(value)
  }
  return value
}
