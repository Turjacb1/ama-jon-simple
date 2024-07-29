import React from 'react';
import './Product.css';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';








const Product = (props) => {
    
    const { img, name, seller, price, stock, key} = props.product;

    return (
        <div className="product">
            <div>
                <img src={img} alt=''></img>
            </div>

            <div >

                <h4 className="product-name"><Link to={"/product/"+key}>{name}</Link></h4>
                <br />
                <p><small>by:{seller}</small></p>
                <p>Price: ${price}</p>
                <br />
                <p><small>Stock: [{stock}] Prouduct Avilable -Hurry Up</small></p>


               {props.showAddToCart && <button className="main-button"
                onClick={()=> props.handleAddProduct(props.product)}//for counting differant differant add cart buttom
                >

                    <FontAwesomeIcon icon={faEnvelope} />
                add to cart</button> }

            </div>
           
        </div>
    );
};

export default Product;



