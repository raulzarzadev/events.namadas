import myFormatDate from "utils/myFormatDate";
interface RangeDateType {
  startAt?: DateType;
  finishAt?: DateType;
}
type DateType = string | number | Date | undefined;

const RangeDate = ({ startAt, finishAt }: RangeDateType) => {
  return (
    <div className="grid place-content-center text-center">
      <span>
        {`From: 
          ${myFormatDate(startAt, 'dd-MMM-yy')}`}
      </span>
      <span>
        {` 
        To: 
        ${myFormatDate(finishAt, 'dd-MMM-yy')}
        `}
      </span>
    </div>
  );
};
export default RangeDate