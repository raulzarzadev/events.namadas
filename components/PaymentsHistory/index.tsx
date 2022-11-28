import PaymentCard from '@comps/PaymentCard'
import useEventsPayments from 'hooks/useEventsPayments'
import { sortFromNow } from 'utils/myFormatDate'

const PaymentsHistory = ({ title }: { title: string }) => {
  const { userPayments } = useEventsPayments({ getUserPayments: true })
  return (
    <div>
      <h3 className="text-lg  font-bold mt-4 ">{title}</h3>
      <div className="grid ">
        <div className="flex flex-row gap-2 overflow-x-auto pb-4 min-h-[115px] ">
          {userPayments?.sort(sortFromNow).map((payment) => (
            <PaymentCard key={payment?.id} size="sm" payment={payment} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PaymentsHistory
