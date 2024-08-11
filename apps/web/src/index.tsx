import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Workspace } from 'types'
import App from '@/App'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const Main = () => {
  const queryClient = new QueryClient()

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>
  )
}

const app = document.querySelector('#app')
if (app) createRoot(app).render(<Main />)
