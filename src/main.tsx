import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import App from './index'
import { FilmsProvider } from './context/FilmsContext'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FilmsProvider>
      <App />
    </FilmsProvider>
  </StrictMode>
)
