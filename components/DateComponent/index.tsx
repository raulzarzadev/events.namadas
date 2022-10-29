import myFormatDate from "utils/myFormatDate";
type DateType = string | number | Date | undefined;

const DateComponent = ({
  date,
  format = 'dd/MMM/yy',
}: {
  date?: DateType;
  format?: string;
}) => {
  if(!date) return <></>
  return <div>{myFormatDate(date, format)}</div>;
};

export default DateComponent;
