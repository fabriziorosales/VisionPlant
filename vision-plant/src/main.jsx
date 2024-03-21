import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import MiniDrawer from './layout/Dashboard.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Plants from './pages/Plants.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element: <MiniDrawer />,
    children: [
      { path: '/', element: <App/>, index: true },
      { path: '/plants', element: <Plants /> },

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
