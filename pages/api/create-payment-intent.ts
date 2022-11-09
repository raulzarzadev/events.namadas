import { CartProduct } from '@firebase/UserCart/UserCart.model';

// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
export const calculateOrderAmount = (items: CartProduct[]) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  let total = 1;
  items.forEach((item) => {
    total += parseFloat(`${item?.amount || 0}`);
  });
  // console.log(total)
  return total;
};

export default async function handler(
  req: { body: { items: any } },
  res: { send: (arg0: { clientSecret: any }) => void }
) {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'eur',
    automatic_payment_methods: {
      enabled: false,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
