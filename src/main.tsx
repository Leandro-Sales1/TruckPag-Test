import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import App from './index.tsx'
import { FilmsProvider } from './context/FilmsContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FilmsProvider>
      <App />
    </FilmsProvider>
  </StrictMode>
)
