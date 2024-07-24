import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/pages/Home.jsx";
import Registration from "./components/pages/Registration.jsx";
import NotFoundPage from "./components/pages/NotFoundPage.jsx";
import Login from "./components/pages/Login.jsx";
import Map from "./components/pages/Map.jsx"
import SubmitLocation from "./components/pages/SubmitLocation.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFoundPage/>,
  },
  {
    path: '/registration',
    element: <Registration/>,
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/map',
    element: <Map/>,
  },
  {
    path: '/submitlocation',
    element: <SubmitLocation/>,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
