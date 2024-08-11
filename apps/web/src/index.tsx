import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Workspace } from 'types'
import App from '@/App'
import './index.css'

const Main = () => {
  const [data, setData] = useState<Workspace[]>([])

  useEffect(() => {
    fetch('http://localhost:8080/workspaces')
      .then(response => response.json())
      .then(({ data }) => setData(data))
  }, [])

  return (
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  )
}

const app = document.querySelector('#app')
if (app) createRoot(app).render(<Main />)
