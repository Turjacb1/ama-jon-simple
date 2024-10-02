// import React from 'react';
// import { useParams } from 'react-router-dom';
// import fakeData from '../../fakeData';
// import Product from '../Product/Product';



// const ProductDetail = () => {
    
//     const {productKey}=useParams() 
//     const product=fakeData.find(pd => pd.key === productKey);
//     //console.log(product);


//     return (
//         <div>
//             <h1>your product detail </h1>
//             <Product showAddToCart={false} product={product}></Product>
            

            
//         </div>
//     );
// };

// export default ProductDetail;



import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const { productKey } = useParams(); // Retrieve productKey from URL
    const product = fakeData.find(pd => pd.key === productKey); // Find the product based on the key

    if (!product) {
        return <h2>Product not found!</h2>; // If no product is found, show an error message
    }

    return (
        <div>
            <h1>Your Product Detail</h1>
            {/* Pass the found product and hide the Add to Cart button */}
            <Product showAddToCart={false} product={product} />
        </div>
    );
};

export default ProductDetail;
