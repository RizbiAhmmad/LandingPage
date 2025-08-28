import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:[
        {
            path: "/",
            element: <Home></Home>
        },
        
      ]
    },

 {
       path: "dashboard",
      element: <Dashboard></Dashboard>,
      children:[
        { index: true, element: <DashboardHome /> },
         {
        path: "users",
        element: <AllUsers></AllUsers>,
      },
       {
        path: "profile",
        element: <Profile></Profile>,
      },
       
      ]
    }

  ]);