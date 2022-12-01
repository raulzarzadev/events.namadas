import PaymentDetails from '@comps/PaymentDetails'
import PrivatePage from 'HOCS/PrivatePage'
import useAuth from 'hooks/useAuth'
import useEventsPayments from 'hooks/useEventsPayments'
import { useRouter } from 'next/router'

const PaymentPage = () => {
  const {
    query: { id }
  } = useRouter()
  const paymentId = id as string
  const { payment } = useEventsPayments({ paymentId })
  const { user } = useAuth()

  if (user && payment?.userId === user?.id)
    return (
      <PrivatePage>
        <PaymentDetails payment={payment} />
      </PrivatePage>
    )

  return (
    <div>
      <h2>{`Can't see this page`}</h2>
    </div>
  )
}

export default PaymentPage
