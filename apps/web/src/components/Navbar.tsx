import { House, MessageCircleMore, User } from 'lucide-react'
import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

const Navbar = ({
  active,
  onNavClick,
  children,
}: {
  active?: string
  onNavClick?: (arg: string) => void
  children?: ReactNode
}) => {
  return (
    <div className="flex justify-center ">
      {children}
      <div className="fixed bottom-0 mb-2 w-full max-w-[375px] mx-auto">
        <div className="flex justify-around mb-0 bg-white w-full border-t-2 border-gray-200 rounded-3xl shadow-xl p-3">
          <NavItem
            data-testid="messages-icon"
            icon={<MessageCircleMore strokeWidth={2.5} />}
            active={active === 'messages'}
            onClick={() => onNavClick?.('messages')}
          />
          <NavItem
            icon={<House strokeWidth={2.5} />}
            active={active === 'home'}
            onClick={() => onNavClick?.('home')}
          />
          <NavItem
            icon={<User strokeWidth={2.5} />}
            active={active === 'profile'}
            onClick={() => onNavClick?.('profile')}
          />
        </div>
      </div>
    </div>
  )
}

const NavItem = ({
  icon,
  active,
  onClick,
}: {
  icon: ReactNode
  active: boolean
  onClick: () => void
}) => {
  return (
    <div
      className={cn(
        'flex flex-column items-center cursor-pointer p-2 rounded-full',
        active
          ? 'border-2 border-brand-primary text-brand-primary'
          : 'border-0 border-gray-500 text-gray-500'
      )}
      onClick={onClick}
    >
      {icon}
    </div>
  )
}

export default Navbar
