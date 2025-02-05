// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import ReactDOM from 'react-dom/client';
// import { createRoot } from 'react-dom/client';
// @ts-ignore
// import {createBrowserRouter, RouterProvider } from 'react-router-dom';
// import './index.css'
// import App from './App.jsx'
// import Homepage from './Pages/Homepage'
// import SignUp from './Pages/SignUp'
// import SignIn from './Pages/SignIn'
// import React from 'react';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     // errorElement: <ErrorPage />,
//     children: [
//       {
//         index: true,
//         element: <Homepage />,
//       },
//       {
//         path: 'signup',
//         element: <SignUp />,
//       },
//       {
//         path: 'signin',
//         element: <SignIn />,
//       }
//     ],
//   },
// ]);

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <RouterProvider router={router} />
// );






// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
