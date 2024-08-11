const storeFormData: (questionData: string[][]) => void = questionData => {
  try {
    window.localStorage.setItem('questionData', JSON.stringify(questionData))
  } catch (error) {
    // TODO
  }
}

const getFormData: () => string[][] = () => {
  try {
    if (typeof window !== 'undefined') {
      const item = window.localStorage.getItem('questionData')
      if (typeof item === 'string') {
        const questionData = JSON.parse(item) as string[][]

        return questionData
      }
    }
    return Array(26).fill([])
  } catch (error) {
    return Array(26).fill([])
  }
}

const clearFormData: () => void = () => {
  try {
    window.localStorage.removeItem('questionData')
  } catch (error) {
    // TODO
  }
}

export { clearFormData, getFormData, storeFormData }
