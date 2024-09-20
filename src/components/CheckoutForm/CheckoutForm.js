import React from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import './checkoutForm.css';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/completion', // Stripe will handle the redirect to this page on success
      },
    });

    if (error) {
      console.error('[error]', error);
      // You can show an error message to the user here
    }
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Complete Your Payment</h1>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="payment-element">
          <PaymentElement />
        </div>
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
