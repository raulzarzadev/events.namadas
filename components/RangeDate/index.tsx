import myFormatDate from 'utils/myFormatDate'
interface RangeDateType {
  startAt?: DateType
  finishAt?: DateType
  format?: string
}
type DateType = string | number | Date | undefined | null

const RangeDate = ({
  startAt,
  finishAt,
  format = 'dd-MM-yy'
}: RangeDateType) => {
  return (
    <span className="grid place-content-center text-center">
      <span>
        {`From: 
          ${startAt ? myFormatDate(startAt, format) : ''}`}
      </span>
      <span>
        {` 
        To: 
        ${finishAt ? myFormatDate(finishAt, format) : ''}
        `}
      </span>
    </span>
  )
}
export default RangeDate
