const storeFormData: (questionData: string[][]) => void = questionData => {
  try {
    window.localStorage.setItem('questionData', JSON.stringify(questionData))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // TODO
  }
}

const getFormData: () => string[][] = () => {
  try {
    if (typeof window !== 'undefined') {
      const item = window.localStorage.getItem('questionData')

      return JSON.parse(item ?? '') as string[][]
    }
    return Array(26).fill([])
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return Array(26).fill([])
  }
}

const clearFormData: () => void = () => {
  try {
    window.localStorage.removeItem('questionData')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // TODO
  }
}

export { clearFormData, getFormData, storeFormData }
