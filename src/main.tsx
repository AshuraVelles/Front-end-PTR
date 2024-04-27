import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css'
import Login from './Login.tsx'
import ItemGridPage from './item-grid-page.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ItemGridPage />
  </React.StrictMode>,
)
