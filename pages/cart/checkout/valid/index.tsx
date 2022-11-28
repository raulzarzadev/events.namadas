/* eslint-disable @typescript-eslint/naming-convention */
import { GetServerSidePropsContext } from 'next'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { payment_intent, payment_intent_client_secret, redirect_status } =
    context.query
  return {
    props: {
      payment_intent,
      payment_intent_client_secret,
      redirect_status
    }
  }
}
const ValidCheckout = () => {
  /**
   *  TODO
   *
   *  steps to validate payment
   * create req before to pay
   * once paid update request to paid
   * redirect to finish subs depends of the type of payment
   * verify userInfo for the event.
   * payment === generalPrice update request with the {userInfo, paymentInfo}
   * payment === partialPrice update request with the {userInfo, paymentInfo }
   * payment === subEventPrice update request with the {userInfo, paymentInfo :{ subEvent }}
   *
   */
  return <div></div>
}

export default ValidCheckout
