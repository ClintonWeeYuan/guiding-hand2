import { PropsWithChildren } from 'react'

import Navbar from './Navbar'
import { useLocation, useNavigate } from 'react-router-dom'

export default function AppLayout({ children }: PropsWithChildren) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavClick = (page: string) => {
    navigate(`/${page}`)
  }

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Navbar active={location.pathname.slice(1)} onNavClick={handleNavClick}>
        <div className="py-5" style={{ minHeight: '545px' }}>
          {children}
        </div>
      </Navbar>
    </div>
  )
}
