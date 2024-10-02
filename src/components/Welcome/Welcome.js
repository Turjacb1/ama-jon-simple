import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css'

const Welcome = () => {
    return (
        <div className="welcome-container">
            <div className="welcome-content">
                <h1 className="welcome-title">Welcome to Our Store!</h1>
                <p className="welcome-message">Discover amazing products and enjoy seamless shopping experiences.</p>
                
                <Link to="/shop">
                    <button className="welcome-button">Start Shopping</button>
                </Link>
            </div>
        </div>
    );
};

export default Welcome;