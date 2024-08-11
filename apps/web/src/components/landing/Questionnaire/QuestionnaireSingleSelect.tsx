import React, { useCallback, useEffect, useState } from 'react'
import { Control, Controller } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { RadioGroup } from '@/components/ui/radio-group'
import { Question } from '@/lib/questionnaire/utils/questionDict'
import { FormValue } from '@/lib/questionnaire/utils/questionnaireType'

import CustomRadio from './CustomRadio'

interface SingleSelectProps {
  question: Question
  mainQuestionNumber: number
  userData: string[][]
  onOptionSelected: (
    selectedOption: string,
    questionNumber: string | number,
  ) => void
  handleSkip: () => void
  control: Control<FormValue>
}

const QuestionnaireSingleSelect: React.FC<SingleSelectProps> = ({
  question,
  mainQuestionNumber,
  userData,
  onOptionSelected,
  handleSkip,
  control,
}) => {
  const getInitialOption = useCallback(() => {
    const options = userData[mainQuestionNumber - 1] ?? []

    return options[0] ?? ''
  }, [mainQuestionNumber, userData])

  const [selectedOption, setSelectedOption] =
    useState<string>(getInitialOption())

  useEffect(() => {
    setSelectedOption(getInitialOption())
  }, [getInitialOption, mainQuestionNumber])

  const isSelected: (option: string) => boolean = option => {
    return option === selectedOption
  }

  const renderOptions = () => {
    return (
      <Controller
        name={`response.${mainQuestionNumber}.option`}
        control={control}
        render={({ field }) => {
          const { onChange } = field

          return (
            <RadioGroup
              onValueChange={e => {
                onChange(e)
                setSelectedOption(e)
              }}
            >
              {Object.keys(question.options).map((option, index) => {
                return (
                  <CustomRadio
                    option={option}
                    isSelected={isSelected(option)}
                    key={index}
                  />
                )
              })}
            </RadioGroup>
          )
        }}
      />
    )
  }

  const handleSubmit = () => {
    if (selectedOption === '' || selectedOption === 'skipped') {
      handleSkip()
    } else {
      onOptionSelected(selectedOption, question.options[selectedOption]!)
    }
  }

  return (
    <div>
      <h1 className="text-xl text-gray-500 text-center mb-10 mx-5 animation-fadeInFromRight hover:cursor-pointer">
        {question.label}
      </h1>
      <p className="text-base text-gray-500 text-center">
        Only 1 answer can be selected.
      </p>

      <div className="h-[80vh] flex flex-col justify-center">
        <div className="text-gray-500 mb-10 my-5 flex flex-col items-center">
          {renderOptions()}
        </div>

        <div className="flex flex-col items-center">
          <Button
            className="bg-brand-primary hover:bg-brand-primary-light"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}

export default QuestionnaireSingleSelect
