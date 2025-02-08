import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import Homepage from './Pages/Homepage'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'
import './index.css'
import App from './App.jsx'
import React from 'react'
import Results from './Pages/Results';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'signin',
        element: <SignIn />,
      },
      {
        path: 'results',
        element: <Results />,
      }
    ],
  },
]);



// the if statement checks if the page exists, which removes the null case 
const pageRoot = document.getElementById('root')
if (pageRoot) {
  ReactDOM.createRoot(pageRoot).render(
    <RouterProvider router={router} />
  );
  
}





// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )





// EVERYTHING BELOW HERE IS OUR OG CODE

// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import React from 'react'


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )