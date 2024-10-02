// // import * as React from "react";
// // import * as ReactDOM from "react-dom/client";


// // import Header from './components/Header/Header';
// // import {
// //   createBrowserRouter,
// //   Router,
// //   RouterProvider
  
// // } from "react-router-dom";

// // import './App.css';



// // import Shop from './components/Shop/Shop';

// // import Review from './components/Review/Review';
// // import Inventory from './components/Inventory/Inventory';
// // import Notfound from "./components/Not-found/Notfound";
// // import ProductDetail from "./components/ProductDetail/ProductDetail";
// // import Login from "./components/Login/Login";
// // import Shipment from "./components/Shipment/Shipment";







// // //import { createContext } from "react";





// // export const UserContext=React.createContext()


// // function App(props) {
// //   const [loggedInUser,setLoggedInUser]=React.useState({})




// //   const router = createBrowserRouter([
    
// //     {
// //       path: "/shop",
// //       element:<Shop/>
      
// //     },

// //     {
// //       path:"/review",
// //       element:<Review/>
// //     },

// //     {
// //       path:"/inventory",
// //       element:<Inventory/>
// //     },
    
// //     {
// //       path:"/login",
// //       element:<Login/>
// //     },

    
// //       {

// //      path:"/shipment",
// //       element:<Shipment/>
     
      
// //       },

// //     {
// //       path:"/",
// //         element:<Shop/>
// //     },
    
// //     {
// //       path:"product/:productkey",   /* : using for dynamically product peye jai */
// //       element:<ProductDetail/>
// //     },
     

// //     {
// //       path:"*",
// //       element:<Notfound/>

// //     }
// //   ])
 
 
// //   return (
   

    
// //     <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
// //       <h3>email :{loggedInUser.email}</h3>
// //     <Header></Header>
    
     
// //       <RouterProvider router={router}/>
      
      
      
    

// //       </UserContext.Provider>
 
   
// //   );
// // }



// // export default App;
















// import * as React from "react";
// import * as ReactDOM from "react-dom/client";

// import Header from './components/Header/Header';
// import {
//   createBrowserRouter,
//   Router,
//   RouterProvider,
//   Route,
//   Navigate
// } from "react-router-dom";

// import './App.css';

// import Shop from './components/Shop/Shop';
// import Review from './components/Review/Review';
// import Inventory from './components/Inventory/Inventory';
// import Notfound from "./components/Not-found/Notfound";
// import ProductDetail from "./components/ProductDetail/ProductDetail";
// import Login from "./components/Login/Login";
// import Shipment from "./components/Shipment/Shipment";
// import PrivateRoute from"./components/Shipment/Shipment";

// export const UserContext = React.createContext()

// function App(props) {
//   const [loggedInUser, setLoggedInUser] = React.useState({})

//   const router = createBrowserRouter([
//     {
//       path: "/shop",
//       element: <Shop />
//     },
//     {
//       path: "/review",
//       element: <Review />
//     },
//     {
//       path: "/inventory",
//       element: <Inventory />
//     },
//     {
//       path: "/login",
//       element: <Login />
//     },
//     {
//       path: "/shipment",
//       element: (
//         <PrivateRoute>
//           <Shipment />
//         </PrivateRoute>
//       )
//     },
//     {
//       path: "/",
//       element: <Shop />
//     },
//     {
//       path: "product/:productkey", // : using for dynamically product peye jai
//       element: <ProductDetail />
//     },
//     {
//       path: "*",
//       element: <Notfound />
//     }
//   ])

//   return (
//     <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
//       <h3>email: {loggedInUser.email}</h3>
//       <Header />
//       <RouterProvider router={router} />
//     </UserContext.Provider>
//   );
// }

// export default App;








import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Header from './components/Header/Header';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Navigate
} from "react-router-dom";
import './App.css';
import Shop from './components/Shop/Shop';
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import Notfound from "./components/Not-found/Notfound";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Login from "./components/Login/Login";
import Shipment from "./components/Shipment/Shipment";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ProcessPayment from "./components/ProcessPayment/ProcessPayment";

export const UserContext = React.createContext();


function App(props) {
  const [loggedInUser, setLoggedInUser] = React.useState({});

  const router = createBrowserRouter([
    {
      path: "/shop",
      element: <Shop />
    },
    {
      path: "/review",
      element: <Review />
    },
    {
      path: "/inventory",
      element: (
        <PrivateRoute>
          <Inventory />
        </PrivateRoute>
      )
    },
    {
      path: "/login",
      element: <Login />
    },


    {
      path: "/processpayment",
      element: <ProcessPayment/>
    },

    
    {
      path: "/shipment",
      element: (
        <PrivateRoute>
          <Shipment />
        </PrivateRoute>
      )
    },
    {
      path: "/",
      element: <Shop />
    },
    {
      path: "product/:productkey",
      element: <ProductDetail />
    },
    {
      path: "*",
      element: <Notfound />
    }
  ]);

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      
      <Header />
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;






// import React, { useEffect, useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import CheckoutForm from './components/CheckoutForm/CheckoutForm'; // Adjust the import path based on your structure

// const stripePromise = loadStripe('pk_test_51PuaNcRrQKZfM8jFprXyvHUMHImaQzDy6DTgGzvdnwH2O5kBeA9b6pyGsfEWq8tHBytlzFDqgZTxqnTx0hNNedcI00xY4bsmsA');

// const App = () => {
//   const [clientSecret, setClientSecret] = useState('');

//   useEffect(() => {
//     // Fetch the client secret from the backend
//     const fetchClientSecret = async () => {
//       const response = await fetch('/create-payment-intent', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ amount: 1000 }),
//       });
      
//       if (response.ok) {
//         const data = await response.json();  // Safely parse JSON
//         console.log(data.clientSecret);  // Access the clientSecret
//       } else {
//         const errorText = await response.text();  // Log the raw error text
//         console.error('Server Error:', errorText);
//       }
//        // Set the actual client secret
//     };

//     fetchClientSecret();
//   }, []);

//   const options = {
//     clientSecret: clientSecret, // Use the actual client secret from the backend
//   };

//   return (
//     clientSecret && (
//       <Elements stripe={stripePromise} options={options}>
//         <CheckoutForm />
//       </Elements>
//     )
//   );
// };

// export default App;
