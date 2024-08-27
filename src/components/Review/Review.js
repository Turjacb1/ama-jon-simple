// import React, { useEffect, useState } from 'react';
// import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
// import fakeData from '../../fakeData';
// import ReviewItem from '../ReviewItem/ReviewItem';
// import Cart from '../Cart/Cart';
// import happyImage from'../../images/tenor.gif';
// import { useNavigate } from 'react-router-dom';



// const Review = () => {
//     const [cart ,setCart]=useState([]);
//     const [orderPlaced,setOrderPlaced]=useState(false);
//     const history=useNavigate();


//     const handleProceedOrder = () =>
//     {
//         history('/shipment');
     
//     }



//     const removeProduct=(productKey)=>
//     {
//         //console.log("removed click",productKey);
//         const newCart=cart.filter(pd=> pd.key !== productKey);
//         setCart(newCart);
//         removeFromDatabaseCart(productKey);
//     }

    
//     useEffect(()=>
//     {
//         const savedCart=getDatabaseCart();
        
//         const productKeys=Object.keys(savedCart);
        
//         const cartProducts =productKeys.map(key =>
//             {
//             const product=fakeData.find(pd =>pd.key ===key);
            
//             product.quantity=savedCart[key];
//             return product;
//         });
//         setCart(cartProducts);
        

//     },[]);
   

//     let thankYou;
//     if(orderPlaced)
//     {
//         thankYou=<img src={happyImage} alt=" " />
//     }
    

//     return (
//         <div className="twin-container">
            
            
//             <div className="product-container">

//          {
                
//                 cart.map(pd=><ReviewItem 
//                     key={pd.key}
//                     removeProduct={removeProduct}
//                     product={pd}></ReviewItem>)
//             }


//             {
//                 thankYou
//             }


//             </div>
//             <div className="cart-container">
//                 <Cart cart={cart}>
//                     <button onClick={handleProceedOrder} className="main-button">Proceed Checkout</button>
//                 </Cart>

//             </div>
            
//         </div>
//     );
// };

// export default Review;










import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/tenor.gif';




const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loggedInUser] = useContext(UserContext);
  const navigate = useNavigate();

  const handleProceedOrder = () => {
    if (!loggedInUser.email) {
      navigate('/login', { state: { from: '/shipment' } });
    } else {
      navigate('/shipment');
    }
  };

  const removeProduct = (productKey) => {
    const newCart = cart.filter(pd => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  }




  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const cartProducts = productKeys.map(key => {
      const product = fakeData.find(pd => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(cartProducts);
  }, []);

  let thankYou;
  if (orderPlaced) {
    thankYou = <img src={happyImage} alt="" />
  }



  
  return (
    <div className="twin-container">
      <div className="product-container">
        {
          cart.map(pd => <ReviewItem
            key={pd.key}
            removeProduct={removeProduct}
            product={pd}></ReviewItem>)
        }
        {thankYou}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button onClick={handleProceedOrder} className="main-button">Proceed Checkout</button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
