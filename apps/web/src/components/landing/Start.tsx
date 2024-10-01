import { Button } from '@/components/ui/button'
import { FC } from 'react'

interface Props {
  handleStart: () => void
  handleSkip: () => void
}

const Start: FC<Props> = ({ handleStart, handleSkip }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="lg:w-3/5">
        <h1 className="text-2xl text-gray-400 font-light mb-8">
          Self-Assessment
        </h1>
        <div className="lg:text-lg text-gray-400 mx-5 mb-8 space-y-4">
          <p>
            Thanks for letting us assist you. To better understand your
            situation and assess your options, please fill out this confidential
            questionnaire.
          </p>
          <p>
            All questions are optional. If you encounter any difficulties,
            connect with us on Chat.
          </p>
          <p>
            (If you are seeking help for your daughter, wife, partner,
            girlfriend or friend, please help them complete this confidential
            questionnaire)
          </p>
        </div>

        <div className="flex justify-center align-center">
          <Button
            type="button"
            className="bg-brand-primary hover:bg-brand-primary-dark text-white border-0 rounded-2xl py-4 lg:mt-5vh mb-2% w-3/5 transition-colors duration-300"
            onClick={handleStart}
          >
            I&apos;ll give it a shot
          </Button>
        </div>

        <Button
          type="button"
          className="bg-transparent hover:bg-transparent text-brand-neutral hover:text-brand-primary border-0 py-2 px-4 cursor-pointer underline"
          onClick={handleSkip}
        >
          Skip for now
        </Button>
      </div>
    </div>
  )
}

export default Start
