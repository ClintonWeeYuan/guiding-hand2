import { FC } from 'react'
import { Control } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import questions from '@/lib/questionnaire/utils/questionDict'
import { FormValue } from '@/lib/questionnaire/utils/questionnaireType'

import QuestionnaireMultiSelect from './QuestionnaireMultiSelect'
import QuestionnaireSingleSelect from './QuestionnaireSingleSelect'

interface BackSkipButtonsProps {
  handleBackClick: () => void
  handleSkipClick: () => void
}
const BackSkipButtons: FC<BackSkipButtonsProps> = ({
  handleBackClick,
  handleSkipClick,
}) => {
  return (
    <div className="w-full fixed bottom-0 left-0 flex justify-between px-2 py-2">
      <Button
        variant="ghost"
        className="text-brand-neutral text-sm underline"
        type="button"
        onClick={handleBackClick}
      >
        Back
      </Button>
      <Button
        variant="ghost"
        className="text-brand-neutral text-sm underline"
        type="button"
        onClick={handleSkipClick}
      >
        Skip
      </Button>
    </div>
  )
}

interface ProgressBarProps {
  progress: number
}
const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const outerBarStyle = {
    width: '100%',
    backgroundColor: '#E4E4E4',
    borderRadius: '15px',
    padding: '3px',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,.2)',
  }

  const innerBarStyle = {
    backgroundColor: '#BB6192',
    width: `${progress}%`,
    height: '20px',
    borderRadius: '10px',
  }

  return (
    <div style={outerBarStyle}>
      <div style={innerBarStyle} />
    </div>
  )
}

interface QuestionnaireProps {
  handleOptionSelected: (
    selectedOption: string,
    nextQuestionIndex: number | string,
  ) => void
  handleMultipleOptionSelected: (selectedOption: string[]) => void
  handleSkipClick: () => void
  handleBackClick: () => void
  questionId: number
  userData: string[][]
  control: Control<FormValue>
}
const Questionnaire: React.FC<QuestionnaireProps> = ({
  handleOptionSelected,
  handleMultipleOptionSelected,
  handleSkipClick,
  handleBackClick,
  questionId,
  userData,
  control,
}) => {
  if (questionId === 3) {
    return (
      <div className="text-center h-[80vh]">
        <ProgressBar progress={20.7} />

        <div className="h-full flex items-center justify-center">
          <h1 className="text-xl"> You might not be pregnant</h1>
        </div>
        <div className="fixed bottom-0 left-0 w-full flex justify-between px-2.5">
          <button
            type="button"
            className="text-gray-500 hover:text-brand-primary m-5"
            onClick={handleBackClick}
          >
            Back
          </button>
          <button
            type="button"
            className="text-gray-500 hover:text-brand-primary m-5"
            onClick={() => handleOptionSelected('next', 5)}
          >
            Next
          </button>
        </div>
      </div>
    )
  } else if (questionId === 4) {
    return (
      <div className="text-center h-[80vh]">
        <ProgressBar progress={20.7} />

        <div className="h-full flex items-center justify-center">
          <h1 className="text-xl">You might be pregnant</h1>
        </div>

        <div className="fixed bottom-0 left-0 w-full flex justify-between px-2.5">
          <button
            type="button"
            className="text-gray-500 hover:text-brand-primary m-5"
            onClick={handleBackClick}
          >
            Back
          </button>
          <button
            type="button"
            className="text-gray-500 hover:text-brand-primary m-5"
            onClick={() => handleOptionSelected('next', 5)}
          >
            Next
          </button>
        </div>
      </div>
    )
  } else {
    const questionIndex = questions.findIndex(quest => quest.id === questionId)
    const currentQuestion = questions[questionIndex]
    if (currentQuestion == undefined) {
      throw Error('Current Question not supposed to be undefined')
    }

    if (!currentQuestion.isMultiSelect) {
      return (
        <div className="h-[80vh]">
          <ProgressBar progress={currentQuestion.progress} />

          <QuestionnaireSingleSelect
            question={currentQuestion}
            mainQuestionNumber={questionId}
            userData={userData}
            onOptionSelected={handleOptionSelected}
            handleSkip={handleSkipClick}
            control={control}
          />

          <BackSkipButtons
            handleBackClick={handleBackClick}
            handleSkipClick={handleSkipClick}
          />
        </div>
      )
    } else {
      return (
        <div className="h-[80vh] flex flex-col">
          <ProgressBar progress={currentQuestion.progress} />

          <QuestionnaireMultiSelect
            question={currentQuestion}
            mainQuestionNumber={questionId}
            userData={userData}
            onSubmit={handleMultipleOptionSelected}
            control={control}
          />

          <BackSkipButtons
            handleBackClick={handleBackClick}
            handleSkipClick={handleSkipClick}
          />
        </div>
      )
    }
  }
}

export default Questionnaire
