import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.

const stripePromise = loadStripe(
  process?.env?.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);
const Checkout = ({
  items = [],
  disabled = false,
}: {
  items: any[];
  disabled?: boolean;
}) => {
  const [clientSecret, setClientSecret] = React.useState('');
  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (items.length) {
      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, [items]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    // appearance,// is not in options type from stripe
  };
  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm disabled={disabled} />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
