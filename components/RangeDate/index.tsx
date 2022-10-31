import myFormatDate from "utils/myFormatDate";
interface RangeDateType {
  startAt?: DateType;
  finishAt?: DateType;
}
type DateType = string | number | Date | undefined | null;

const RangeDate = ({ startAt, finishAt }: RangeDateType) => {
  return (
    <span className="grid place-content-center text-center">
      <span>
        {`From: 
          ${startAt ? myFormatDate(startAt, 'dd-MMM-yy') : ''}`}
      </span>
      <span>
        {` 
        To: 
        ${finishAt?myFormatDate(finishAt, 'dd-MMM-yy'):''}
        `}
      </span>
    </span>
  );
};
export default RangeDate