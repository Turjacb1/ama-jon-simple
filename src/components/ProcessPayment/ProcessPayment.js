// import React, { useEffect, useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import CheckoutForm from '../CheckoutForm/CheckoutForm';
// import './ProcessPayment.css'; // Import CSS file

// const ProcessPayment = () => {
//   const [stripePromise, setStripePromise] = useState(() => loadStripe('pk_test_51PuaNcRrQKZfM8jFprXyvHUMHImaQzDy6DTgGzvdnwH2O5kBeA9b6pyGsfEWq8tHBytlzFDqgZTxqnTx0hNNedcI00xY4bsmsA'));
//   const [clientSecret, setClientSecret] = useState('');

//   useEffect(() => {
//     fetch('http://localhost:3000/create-payment-intent', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ amount: 1000 }),
//     })
//       .then((res) => res.json())
//       .then((data) => setClientSecret(data.clientSecret))
//       .catch((error) => console.error('Error fetching payment intent:', error));
//   }, []);

//   return (
//     <div className="process-payment-container">
//       <h1 className="process-payment-title">Stripe Payment</h1>
//       {clientSecret && (
//         <Elements stripe={stripePromise} options={{ clientSecret }}>
//           <div className="stripe-form">
//             <CheckoutForm />
//           </div>
//         </Elements>
//       )}
//     </div>
//   );
// };

// export default ProcessPayment;





import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import './ProcessPayment.css';

const stripePromise = loadStripe('pk_test_51PuaNcRrQKZfM8jFprXyvHUMHImaQzDy6DTgGzvdnwH2O5kBeA9b6pyGsfEWq8tHBytlzFDqgZTxqnTx0hNNedcI00xY4bsmsA'); // Replace with your actual public key

const ProcessPayment = ({ shipmentData }) => {
    const [clientSecret, setClientSecret] = useState('');
    const [shipmentId, setShipmentId] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    useEffect(() => {
        const fetchPaymentIntent = async () => {
            try {
                const response = await fetch('http://localhost:3000/create-payment-intent', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ amount: 1000, shipmentData }),
                });

                if (!response.ok) throw new Error('Failed to fetch payment intent.');

                const data = await response.json();
                setClientSecret(data.clientSecret);
                setShipmentId(data.shipmentId);
            } catch (error) {
                console.error('Error fetching payment intent:', error);
                setError('Unable to load payment form. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentIntent();
    }, [shipmentData]);

    if (loading) {
        return <p>Loading payment form...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="process-payment-container">
            <h1 className="process-payment-title">Stripe Payment</h1>
            {paymentSuccess ? (
                <p>Payment successful! Thank you for your purchase.</p>
            ) : clientSecret ? (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm shipmentId={shipmentId} onPaymentSuccess={() => setPaymentSuccess(true)} />
                </Elements>
            ) : (
                <p>Error: Unable to retrieve payment data.</p>
            )}
        </div>
    );
};

export default ProcessPayment;
