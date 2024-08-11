import React, { useState } from 'react'

import { Card } from '@/components/ui/card'

import PersonalInfo from './PersonalInfo'
import Signup from './Signup'

interface InformationProps {
  handleSubmit: (event: React.SyntheticEvent) => void
  handleChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void
  handleBack: () => void
}

const Information: React.FC<InformationProps> = ({
  handleSubmit,
  handleChange,
  handleBack,
}) => {
  const [showNext, setShowNext] = useState<boolean>(false)

  const handleNext: () => void = () => {
    setShowNext(true)
  }

  const handlePrevious: () => void = () => {
    setShowNext(false)
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-4">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <Card className="px-4 md:px-12 py-4 md:w-3/5 border-brand-primary-light">
          {showNext ? (
            <Signup
              handleChange={handleChange}
              handlePrevious={handlePrevious}
            />
          ) : (
            <PersonalInfo
              handleChange={handleChange}
              handleBack={handleBack}
              handleNext={handleNext}
            />
          )}
        </Card>
      </form>
    </div>
  )
}

export default Information
