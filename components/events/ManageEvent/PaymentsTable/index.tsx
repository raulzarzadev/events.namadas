import DateComponent from "@comps/DateComponent";
import { EventPaymentType } from "@firebase/EventPayments/eventPayment.model";
export interface PaymentTableType {
  eventPayments: EventPaymentType[]
}
const PaymentsTable = ({eventPayments}:PaymentTableType) => {
  return (
    <div className="bg-base-200 p-2 my-4 max-w-2xl mx-auto rounded-lg">
      <h4 className="text-xl font-bold ">
        Payments <span>({eventPayments?.length || 0})</span>
      </h4>
      <div className="overflow-auto max-w-full">
        <table className="mx-auto table">
          <thead>
            <tr>
              <th className="max-w-[100px]">Created at</th>
              <th>status</th>
              <th>user Id</th>
              <th>Event</th>
              <th>Price title</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {eventPayments.map((payment) => (
              <tr key={payment.id}>
                <td className="truncate">
                  <DateComponent date={payment.createdAt} format="dd MMM yy" />
                </td>
                <td className="truncate max-w-[100px]">{payment.status}</td>
                <td className="truncate max-w-[100px]">{payment.userId}</td>
                <td className="truncate max-w-[100px]">
                  {payment.price?.eventId}
                </td>
                <td className="truncate max-w-[100px]">
                  {payment.price?.title}
                </td>
                <td className="truncate max-w-[100px]">
                  {payment.price?.amount}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={4}></td>
              <td>Total:</td>
              <td>400</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentsTable;