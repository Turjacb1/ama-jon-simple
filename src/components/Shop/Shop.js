import React, { useEffect, useState } from 'react';

import fakeData from '../../fakeData';

import './Shop.css';

import Product from '../Product/Product';

import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';



const Shop = () => {
    const first=fakeData.slice(0,10);     //DATA LOAD FROM API
   
   const [products,setProducts]= useState(first);

   const [cart,setCart]=useState([]);




   useEffect(()=>{

    const savedCart=getDatabaseCart();
    const productKeys=Object.keys(savedCart);
    const previousCart=productKeys.map(exitingKey =>{
    const product=fakeData.find(pd=>pd.key ===exitingKey);
    product.quantity=savedCart[exitingKey];
    return product;
    })
setCart(previousCart);

   }, [])



   const handleAddProduct =(product)=>
   {
    const tooAddedKey=product.key;
    const sameProduct=cart.find(pd => pd.key ===tooAddedKey);
    let count=1;
    let newCart;
    if(sameProduct)
    {

      count=sameProduct.quantity+1;
      sameProduct.quantity=count;
      const others=cart.filter(pd=>pd.key !==tooAddedKey);
      newCart=[...others,sameProduct];
    }
else
{
    product.quantity=1;
    newCart=[...cart,product];
}

    setCart(newCart);
     
    addToDatabaseCart(product.key,count);
   }
   
    return (
        <div className="twin-container">
            <div className="product-container">
               
 
            {
                products.map(pd => <Product
                key={pd.key}
                   showAddToCart={true}
                    handleAddProduct={handleAddProduct}
                    product ={pd}>

                    </Product>)
            }
               
            </div>
            

            <div className="cart-container">
                <Cart cart={cart}>
                <Link to="/review">
            <button className="main-button">Review Order</button>
            </Link>
                </Cart>
                
            </div>
            
        </div>
    );
};

export default Shop;

