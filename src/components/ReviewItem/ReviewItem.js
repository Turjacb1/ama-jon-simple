import React from 'react';

const ReviewItem = (props) => {
    const { name, quantity, key, price, img } = props.product; // Make sure 'img' is destructured from product

    const reviewItemStyle = {
        borderBottom: '1px solid gray',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '100px',
        display: 'flex', // Flexbox to position image and details
        alignItems: 'center'
    };

    const imgStyle = {
        width: '170px',
        height: 'auto',
        marginRight: '20px'
    };

    return (
        <div style={reviewItemStyle} className="review-item">
            <img src={img} alt={name} style={imgStyle} /> {/* Display the product image */}
            <div>
                <h3 className="product-name">{name}</h3>
                <p>Quantity: {quantity}</p>
                <p><small>Price: ${price}</small></p>
                <br />
                <button className="main-button" onClick={() => props.removeProduct(key)}>Remove</button>
            </div>
        </div>
    );
};

export default ReviewItem;
