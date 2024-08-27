// import * as React from "react";
// import * as ReactDOM from "react-dom/client";


// import Header from './components/Header/Header';
// import {
//   createBrowserRouter,
//   Router,
//   RouterProvider
  
// } from "react-router-dom";

// import './App.css';



// import Shop from './components/Shop/Shop';

// import Review from './components/Review/Review';
// import Inventory from './components/Inventory/Inventory';
// import Notfound from "./components/Not-found/Notfound";
// import ProductDetail from "./components/ProductDetail/ProductDetail";
// import Login from "./components/Login/Login";
// import Shipment from "./components/Shipment/Shipment";







// //import { createContext } from "react";





// export const UserContext=React.createContext()


// function App(props) {
//   const [loggedInUser,setLoggedInUser]=React.useState({})




//   const router = createBrowserRouter([
    
//     {
//       path: "/shop",
//       element:<Shop/>
      
//     },

//     {
//       path:"/review",
//       element:<Review/>
//     },

//     {
//       path:"/inventory",
//       element:<Inventory/>
//     },
    
//     {
//       path:"/login",
//       element:<Login/>
//     },

    
//       {

//      path:"/shipment",
//       element:<Shipment/>
     
      
//       },

//     {
//       path:"/",
//         element:<Shop/>
//     },
    
//     {
//       path:"product/:productkey",   /* : using for dynamically product peye jai */
//       element:<ProductDetail/>
//     },
     

//     {
//       path:"*",
//       element:<Notfound/>

//     }
//   ])
 
 
//   return (
   

    
//     <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
//       <h3>email :{loggedInUser.email}</h3>
//     <Header></Header>
    
     
//       <RouterProvider router={router}/>
      
      
      
    

//       </UserContext.Provider>
 
   
//   );
// }



// export default App;
















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
      <h3>email: {loggedInUser.email}</h3>
      <Header />
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
