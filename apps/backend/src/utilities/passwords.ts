import bcrypt from 'bcrypt'

const saltRounds = 10

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, saltRounds)
}

export const validatePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hashedPassword)

  } catch (error) {
    console.error('Error comparing passwords:', error)
    return false
  }
}
