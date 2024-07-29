import * as React from "react";
import * as ReactDOM from "react-dom/client";

import Header from './components/Header/Header';
import {
  createBrowserRouter,
  Router,
  RouterProvider,
} from "react-router-dom";

import './App.css';



import Shop from './components/Shop/Shop';

import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import Notfound from "./components/Not-found/Notfound";
import ProductDetail from "./components/ProductDetail/ProductDetail";








function App() {
  const router = createBrowserRouter([
    {
      path: "/shop",
      element:<Shop/>
      
    },

    {
      path:"/review",
      element:<Review/>
    },

    {
      path:"/inventory",
      element:<Inventory/>
    },

    {
      path:"/",
        element:<Shop/>
    },
    
    {
      path:"product/:productkey",
      element:<ProductDetail/>
    },
     

    {
      path:"*",
      element:<Notfound/>

    }
  ])
 

  return (
    
    <div>
    <Header></Header>
    
     
      <RouterProvider router={router}/>
      
      
      
    

    </div>
   
  );
}



export default App;
