import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// 👇 THIS LINE IS REQUIRED!
import './index.css' 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)