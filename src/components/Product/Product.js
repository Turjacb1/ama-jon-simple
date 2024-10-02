import React from 'react';
import './Product.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const { img, name, seller, price, stock, key } = props.product;

    return (
        <div className="product">
            <div className="product-image">
                <img src={img} alt={name} />
            </div>

            <div className="product-details">
                <h4 className="product-name">
                    <Link to={`/product/${key}`}>{name}</Link>
                </h4>
                <p><small>by: {seller}</small></p>
                <p className="product-price">Price: ${price}</p>
                <p className="product-stock">
                    <small>Stock: [{stock}] Available - Hurry Up!</small>
                </p>

                {props.showAddToCart && (
                    <button
                        className="main-button"
                        onClick={() => props.handleAddProduct(props.product)}
                    >
                        <FontAwesomeIcon icon={faEnvelope} /> Add to Cart
                    </button>
                )}
            </div>
        </div>
    );
};

export default Product;
