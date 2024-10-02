import React from 'react';
import './Cart.css';  // Importing the CSS file

const Cart = (props) => {
    const cart = props.cart;

    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
    }

    let shipping = 0;

    if (total > 500.00) {
        shipping = 0;
    } else if (total > 200) {
        shipping = 5.00;
    } else if (total > 1 && total < 200) {
        shipping = 25.50;
    }

    const tax = (total / 10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div className="cart-container">
            <h3 className="cart-summary">Order Summary</h3>
            <h4 className="cart-items">Items: {cart.length}</h4>
            <div className="cart-details">
                <p><strong>Product Price:</strong> {formatNumber(total)}</p>
                <p><strong>Shipping Cost:</strong> {shipping}</p>
                <p><strong>Tax + VAT:</strong> {tax}</p>
            </div>
            <p className="cart-total-price">Total Price: <span>{grandTotal}</span></p>

            <div className="cart-children">
                {props.children}
            </div>
        </div>
    );
};

export default Cart;
