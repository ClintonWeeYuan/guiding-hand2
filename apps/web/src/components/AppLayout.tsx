import { useRouter } from 'next/router'
import { PropsWithChildren } from 'react'

import Navbar from './Navbar'

export default function AppLayout({ children }: PropsWithChildren) {
  const router = useRouter()

  const handleNavClick = (page: string) => {
    router.push(`/${page}`)
  }

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Navbar active={router.pathname.slice(1)} onNavClick={handleNavClick}>
        <div className="py-5" style={{ minHeight: '545px' }}>
          {children}
        </div>
      </Navbar>
    </div>
  )
}
