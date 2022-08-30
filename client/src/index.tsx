import React from 'react'
import ReactDOM from 'react-dom/client'
import './app/index.css'
import App from './app'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <>
    <App />
  </>
)
console.log(process.env.REACT_APP_BASE_URL)
