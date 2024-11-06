// import React from 'react';
// import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
// import './checkoutForm.css';

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: 'http://localhost:3000/completion', // Stripe will handle the redirect to this page on success
//       },
//     });

//     if (error) {
//       console.error('[error]', error);
//       // You can show an error message to the user here
//     }
//   };

//   return (
//     <div className="checkout-container">
//       <h1 className="checkout-title">Complete Your Payment</h1>
//       <form className="checkout-form" onSubmit={handleSubmit}>
//         <div className="payment-element">
//           <PaymentElement />
//         </div>
//         <button type="submit" disabled={!stripe}>
//           Pay
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CheckoutForm;






import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import './checkoutForm.css';

const CheckoutForm = ({ shipmentId }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: { return_url: 'http://localhost:3000/completion' },
            redirect: 'if_required',
        });

        if (error) {
            setErrorMessage(error.message);
            setIsProcessing(false);
        } else {
            await fetch('http://localhost:3000/payment-complete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ shipmentId, paymentIntentId: paymentIntent.id }),
            });
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button type="submit" disabled={!stripe || !elements || isProcessing}>
                {isProcessing ? 'Processing...' : 'Pay'}
            </button>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>
    );
};

export default CheckoutForm;
