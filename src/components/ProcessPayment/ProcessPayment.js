
import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const ProcessPayment = () => {

  const [stripePromise, setStripePromise] = useState(() => loadStripe('pk_test_51PuaNcRrQKZfM8jFprXyvHUMHImaQzDy6DTgGzvdnwH2O5kBeA9b6pyGsfEWq8tHBytlzFDqgZTxqnTx0hNNedcI00xY4bsmsA')); // Replace with your publishable key
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Fetch the client secret from the server when the component mounts
    fetch('http://localhost:3000/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 1000 }), // Amount in cents ($10.00)
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => console.error('Error fetching payment intent:', error));
  }, []);


  return (
    <div>
      
       <h1>Stripe Payment</h1>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret}}>
          <CheckoutForm/>
        </Elements>
      )}

    </div>
  );
};

export default ProcessPayment;
