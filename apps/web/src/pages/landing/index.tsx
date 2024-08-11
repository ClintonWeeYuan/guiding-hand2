import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import {
  clearFormData,
  getFormData,
  storeFormData,
} from '@/lib/questionnaire/utils/localStorage'

import {
  formSchema,
  FormValue,
} from '@/lib/questionnaire/utils/questionnaireType'

import Information from '@/components/landing/Information'
import OnBoarding from '@/components/landing/OnBoarding'
import Questionnaire from '@/components/landing/Questionnaire/Questionnaire'
import Start from '@/components/landing/Start'
import questions from '@/lib/questionnaire/utils/questionDict'
import { useNavigate } from 'react-router-dom'

interface Form {
  firstName: string
  secondName: string
  age: string
  occupation: string
  phoneNumber: string
  gender: string
  pregnant: boolean
  pregnancyWeek: string
  email: string
  username: string
  password: string
  maritalStatus: string
}

const sendToAPI = async (
  formData: Form,
  userData: Record<number, string[]>,
) => {
  const Model = {
    user_type:
      !formData.username || !formData.password || !formData.email
        ? 'Anonymous'
        : 'Registered',
    profile: 'string',
    firstName: formData.firstName,
    secondName: formData.secondName,
    age: formData.age,
    occupation: formData.occupation,
    username: formData.username ? formData.username : 'Unregistered',
    phoneNumber: formData.phoneNumber,
    gender: formData.gender,
    pregnant: formData.pregnant,
    maritalStatus: formData.maritalStatus,
    pregnancyWeek: formData.pregnancyWeek,
    is_anonymous_login:
      !formData.username || !formData.password || !formData.email
        ? 'Anonymous'
        : 'Registered',
    surveyResult: userData,
    email: formData.email ? formData.email : 'Unregistered',
    password: formData.password ? formData.password : 'Unregistered',
  }

  try {
    await axios.post('/api/users', Model, {
      headers: {
        Accept: 'application/json',
      },
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // TODO
  }
}

function LandingPage() {
  const [userData, setUserData] = useState<string[][]>(getFormData())
  const navigate = useNavigate()

  const [userPath, setUserPath] = useState<(string | number)[]>([])

  const [page, setPage] = useState<string>('onBoarding')

  const [questionId, setQuestionId] = useState<number>(1)

  const [form, setForm] = useState<Form>({
    firstName: '',
    secondName: '',
    age: '',
    occupation: '',
    phoneNumber: '',
    gender: '',
    pregnant: false,
    pregnancyWeek: '',
    email: '',
    username: '',
    password: '',
    maritalStatus: '',
  })

  const methods = useForm<FormValue>({
    defaultValues: {
      moreInfo: {},
      response: [{ label: '', option: [], skipped: false }],
    },
    resolver: zodResolver(formSchema),
  })
  const { setValue, control } = methods

  const getFieldIndex: () => number = () => {
    const questionIndex = questions.findIndex(quest => quest.id === questionId)
    const currentQuestion = questions[questionIndex]

    if (currentQuestion == undefined) {
      throw new Error(`Question ${questionIndex} not found`)
    }

    return currentQuestion?.id
  }

  const getCurrentQuestion: () => string = () => {
    const questionIndex = questions.findIndex(quest => quest.id === questionId)
    const currentQuestion = questions[questionIndex]

    if (currentQuestion == undefined) {
      throw new Error(`Question ${questionIndex} not found`)
    }

    return currentQuestion.label
  }

  const getNextQuestion: () => number | string = () => {
    const questionIndex = questions.findIndex(quest => quest.id === questionId)
    const currentQuestion = questions[questionIndex]

    if (currentQuestion == undefined) {
      throw new Error(`Question ${questionIndex} not found`)
    }

    return currentQuestion.ifSkipped
  }

  const setNext: (input: number | string) => void = input => {
    if (typeof input === 'string') {
      setPage(input)
    } else {
      setPage('questionnaire')
      setQuestionId(input ?? -1)
    }
  }

  const updateUserData: (input: string[]) => void = input => {
    const newArray = [...userData]
    newArray[questionId - 1] = input
    setUserData(newArray)
  }

  // Callback for when an option is selected
  const handleOptionSelected: (
    selectedOption: string,
    nextQuestionIndex: number | string,
  ) => void = (selectedOption, nextQuestionIndex) => {
    if (!(questionId == 3 || questionId == 4)) {
      setValue(`response.${getFieldIndex()}.label`, getCurrentQuestion())
      setValue(`response.${getFieldIndex()}.option`, selectedOption)
      setValue(`response.${getFieldIndex()}.skipped`, false)
    }

    setUserPath(prevPath => [...prevPath, questionId])
    updateUserData([selectedOption])
    setNext(nextQuestionIndex)
  }

  const handleMultipleOptionSelected: (
    selectedOptions: string[],
  ) => void = selectedOptions => {
    setValue(`response.${getFieldIndex()}.label`, getCurrentQuestion())
    setValue(`response.${getFieldIndex()}.option`, selectedOptions)
    setValue(`response.${getFieldIndex()}.skipped`, false)

    if (questionId == 2) {
      // Handle Logic for routing

      if (Object.keys(selectedOptions).length > 3) {
        setUserPath(prevPath => [...prevPath, questionId])
        updateUserData(selectedOptions)
        setQuestionId(4)
      } else {
        setUserPath(prevPath => [...prevPath, questionId])
        updateUserData(selectedOptions)
        setQuestionId(3)
      }
    }

    if (questionId == 5) {
      setUserPath(prevPath => [...prevPath, questionId])
      updateUserData(selectedOptions)
      setQuestionId(6)
    }
  }

  const handleBackClick: () => void = () => {
    const newPath = [...userPath]
    if (newPath.length === 1) {
      newPath.pop()
      setUserPath(newPath)
      setPage('Start')
    } else {
      newPath.pop()

      const previousUserQuestion = userPath[userPath.length - 1]

      if (previousUserQuestion == undefined) {
        throw new Error(`Previous question not found`)
      }

      setNext(previousUserQuestion)
      setUserPath(newPath)
    }
  }

  const handleSkipClick: () => void = () => {
    updateUserData(['skipped'])
    setUserPath(prevPath => [...prevPath, questionId])
    setNext(getNextQuestion())

    // Update react-hook-form
    setValue(`response.${getFieldIndex()}.label`, getCurrentQuestion())
    setValue(`response.${getFieldIndex()}.option`, [])
    setValue(`response.${getFieldIndex()}.skipped`, true)
  }

  const handleBack: () => void = () => {
    const prevQuestion = userPath[userPath.length - 1]
    if (prevQuestion != null) {
      setNext(prevQuestion)
    } else {
      setPage('Start')
    }
  }

  const handleChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => void = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  // Declare your form submission handler
  const handleSubmit: (event: React.SyntheticEvent) => void = event => {
    event.preventDefault()
    sendToAPI(form, userData)
    navigate('/login')

    clearFormData()
  }

  useEffect(() => {
    storeFormData(userData)
  }, [userData])

  return (
    <div>
      <div className="text-center font-mainFont">
        <FormProvider {...methods}>
          {/* onboarding page // main design and login button */}
          {page === 'onBoarding' && (
            <OnBoarding
              handleStart={() => {
                setPage('Start')
              }}
              handleLogin={() => {
                navigate('/login')
              }}
            />
          )}

          {/* Start Questionnaire */}
          {page === 'Start' && (
            <Start
              handleStart={() => {
                setPage('questionnaire')
                setQuestionId(1)
                setUserPath(prevPath => [...prevPath, questionId])
              }}
              handleSkip={() => {
                setPage('questionnaire')
                setNext('submit-articles')
              }}
            />
          )}

          {/* Questonnaire */}

          {page === 'questionnaire' && (
            <Questionnaire
              handleOptionSelected={handleOptionSelected}
              handleMultipleOptionSelected={handleMultipleOptionSelected}
              handleSkipClick={handleSkipClick}
              handleBackClick={handleBackClick}
              questionId={questionId}
              userData={userData}
              control={control}
            />
          )}

          {page === 'submit-articles' && (
            <Information
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              handleBack={handleBack}
            />
          )}

          {page === 'submit-chat' && (
            <Information
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              handleBack={handleBack}
            />
          )}
        </FormProvider>
      </div>
    </div>
  )
}

export default LandingPage
