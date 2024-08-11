import React, { useEffect, useState } from 'react'
import { Control, Controller } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Question } from '@/src/lib/questionnaire/utils/questionDict'
import { FormValue } from '@/src/lib/questionnaire/utils/questionnaireType'

interface MultiSelectProps {
  //currentIndex: number
  question: Question
  mainQuestionNumber: number
  userData: string[][]
  onSubmit: (selectedOption: string[]) => void
  control: Control<FormValue>
}
const QuestionnaireMultiSelect: React.FC<MultiSelectProps> = ({
  //currentIndex,
  question,
  mainQuestionNumber,
  userData,
  onSubmit,
  control,
}) => {
  const setInitialOptions: () => string[] = () => {
    if (userData[mainQuestionNumber - 1].includes('skipped')) {
      return []
    }
    return userData[mainQuestionNumber - 1] as string[]
  }

  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    setInitialOptions()
  )

  const handleCheckChange = (isChecked: boolean, option: string) => {
    const newSelectedOptions = [...selectedOptions]
    if (isChecked) {
      if (!selectedOptions.includes(option)) {
        newSelectedOptions.push(option)
        setSelectedOptions(newSelectedOptions)
      }
    } else {
      const optionIndex = newSelectedOptions.indexOf(option)
      if (optionIndex !== -1) {
        newSelectedOptions.splice(optionIndex, 1)
        setSelectedOptions(newSelectedOptions)
      }
    }
  }

  const isTextFieldOption = () => {
    if (question.hasTextInput) {
      return selectedOptions.findIndex(option => option.startsWith('TF-'))
    }
    return -1
  }

  const getFieldText = () => {
    const index = isTextFieldOption()
    if (index !== -1) {
      return selectedOptions[index].substring(3)
    }
    return ''
  }

  const [fieldText, setFieldText] = useState<string>(getFieldText())

  const handleInputChange = (input: string) => setFieldText(input)

  const convertTextFieldToOption = (textField: string) => {
    textField = textField.trim()
    if (textField !== '') {
      return 'TF-' + textField
    }
    return ''
  }

  const submitInput = (text: string) => {
    const addOption = convertTextFieldToOption(text)
    const index = isTextFieldOption()

    if (index !== -1) {
      selectedOptions.splice(index, 1)
    }

    if (addOption !== '') {
      const newSelectedOptions = [...selectedOptions]
      newSelectedOptions.push(addOption)
      setSelectedOptions(newSelectedOptions)
    }
  }

  const isSelected: (option: string) => boolean = option =>
    selectedOptions.includes(option)

  const [submit, setSubmit] = useState<boolean>(false)

  const renderOptions = () => {
    return (
      <Controller
        name={`response.${mainQuestionNumber}.option`}
        control={control}
        render={() => {
          return (
            <div
              className={cn(
                'w-4/5 md:w-3/5 p-4',
                mainQuestionNumber === 5
                  ? 'max-lg:overflow-y-auto lg:grid lg:grid-cols-3 lg:gap-x-1 lg:gap-y-0'
                  : ''
              )}
            >
              {Object.keys(question.options).map((option, index) => {
                return (
                  <Label
                    key={index}
                    htmlFor={index.toString()}
                    className={cn(
                      'flex justify-center border rounded-xl w-full px-4 py-4 mb-2 cursor-pointer',
                      isSelected(option) ? 'bg-brand-primary text-white' : ''
                    )}
                  >
                    <Checkbox
                      id={index.toString()}
                      checked={isSelected(option)}
                      onCheckedChange={e =>
                        handleCheckChange(Boolean(e), option)
                      }
                      className={cn(
                        'peer hidden',
                        isSelected(option)
                          ? 'text-brand-primary'
                          : 'text-gray-500'
                      )}
                    />
                    <span className="cursor-pointer text-sm font-normal">
                      {option}
                    </span>
                  </Label>
                )
              })}

              {question.hasTextInput && (
                <Input
                  id="Text-Field"
                  value={fieldText}
                  placeholder="Others"
                  onChange={e => {
                    handleInputChange(e.target.value)
                  }}
                  className={cn(
                    'h-auto flex justify-center border rounded-xl w-full px-4 py-4 mb-2 cursor-pointer',
                    fieldText !== '' ? 'bg-brand-primary text-white' : ''
                  )}
                />
              )}
            </div>
          )
        }}
      />
    )
  }

  const handleSubmit = () => {
    submitInput(fieldText)
    setSubmit(true)
  }

  useEffect(() => {
    if (submit) {
      onSubmit(selectedOptions)
      setSubmit(false)
    }
  }, [submit])

  return (
    <div className="h-full">
      <h1 className="text-xl text-gray-500 text-center mb-10 mx-5 animation-fadeInFromRight hover:cursor-pointer">
        {question.label}
      </h1>
      <p className="text-base text-gray-500 text-center">
        Multiple answers may be selected.
      </p>

      <div className="h-[80vh] flex flex-col justify-center">
        <div
          className={cn(
            'text-grey-100 flex flex-col items-center',
            mainQuestionNumber === 5 ? 'max-lg:overflow-hidden' : ''
          )}
        >
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

export default QuestionnaireMultiSelect
