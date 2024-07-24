import React, { useState } from 'react';

import { loadStripe } from '@stripe/stripe-js';

import { PaymentElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }
    const paymentBody = {
      amount: 1111,

      currency: 'usd',
      'automatic_payment_methods[enabled]': 'true',

      transfer_group: 'balance_transfer'
      // application_fee_amount: Math.round(details?.booking_payment_info?.total_paid_amount - details?.booking_payment_info?.total_transfered_amount),
      // application_fee_amount: 200,
      // "transfer_data[destination]": paymentDetails?.bank_account_id,
      // customer: userData?.customer_id,
      // 'transfer_data[destination]': 'acct_1OHNb22U4piPbSws',
    };
    const authToken = 'sk_test_51Paum3DRzi8wBXpJhaepRrWkxAqHQzQQiA6QGyrRF1nFlSobbJtMHzIca3GUQYwKTFmw7h8gmuFkQz1ZItIW2l7m00VrwRfURG';

    const res = await fetch('https://api.stripe.com/v1/payment_intents', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(paymentBody)
    });
    if (res.ok) {
      console.log('df');
    }

    // if (res.ok) {
    //   const { client_secret, } = await res.json();

    //   const { error, paymentIntent } = await stripe.confirmPayment({
    //     //`Elements` instance that was used to create the Payment Element
    //     elements,
    //     clientSecret: client_secret,
    //     confirmParams: {
    //       return_url: "http://localhost:3000/payments",
    //     },
    //   });
    // }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button type="submit" disabled={!stripe || !elements}>
          Pay
        </button>
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    </>
  );
};

const stripePromise = loadStripe(
  'pk_test_51Paum3DRzi8wBXpJVcCPgpH2XVdTUyuc7FY25C3vtS5DS8kBqr4gBVJ8qIqvT4aY07ZvDd6bpOklEWAlL3jvhhOF00HOpfX4ot'
);

const PaymentFrom = () => {
  const options = {
    mode: 'payment',
    amount: 100,
    currency: 'usd',

    appearance: {}
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentFrom;
