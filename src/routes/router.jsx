import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Dashboard from "../Layouts/Dashboard";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers";
import Login from "../Authentication/Login";
import SignUp from "../Authentication/SignUp";
import AddProduct from "../Pages/Dashboard/Admin/AddProduct";
import AllProducts from "../Pages/Dashboard/Admin/AllProducts";
import AllOrders from "../Pages/Dashboard/Admin/AllOrders";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:[
        {
            path: "/",
            element: <Home></Home>
        },
         {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
        
      ]
    },

 {
       path: "dashboard",
      element: <Dashboard></Dashboard>,
      children:[
         {
        path: "users",
        element: <AllUsers></AllUsers>,
      },
         {
        path: "addProduct",
        element: <AddProduct></AddProduct>,
      },
         {
        path: "allProducts",
        element: <AllProducts></AllProducts>,
      },
         {
        path: "allOrders",
        element: <AllOrders></AllOrders>,
      },
      
       
      ]
    }

  ]);