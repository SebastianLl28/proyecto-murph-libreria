import { hash, compare } from 'bcryptjs'

const encrypt = async (passPlane: string): Promise<string> => {
  const passwordHash = await hash(passPlane, 8)
  return passwordHash
}

const verified = async (pass: string, passHash: string): Promise<boolean> => {
  const isCorrect = await compare(pass, passHash)
  return isCorrect
}

export {
  encrypt,
  verified
}
