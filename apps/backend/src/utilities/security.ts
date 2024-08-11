import { JWTPayload, jwtVerify, SignJWT } from 'jose'

import { Payload } from '../service/usersService'

const secretKey = process.env.JWT_SECRET_KEY
const key = new TextEncoder().encode(secretKey)

export async function createToken(payload: {
  userId: number
  firstName: string | null
  lastName: string | null
}): Promise<string> {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(key)

  return token
}

function isPayload(payload: JWTPayload): payload is Payload {
  return (
    typeof payload.userId === 'number' &&
    typeof payload.firstName === 'string' &&
    typeof payload.lastName === 'string' &&
    typeof payload.iat === 'number' &&
    typeof payload.exp === 'number'
  )
}

export async function verifyToken(token: string): Promise<Payload> {
  const { payload } = await jwtVerify(token, key)
  if (isPayload(payload)) {
    return payload
  } else {
    throw new Error('Invalid token payload')
  }
}
