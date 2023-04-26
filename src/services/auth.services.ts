import { encrypt } from '../helpers/bcrypt.handle'
import { Auth } from '../interface/auth.inteface'
import { User } from '../interface/user.interface'
import UserModel from '../models/user'

interface UserCreate extends Auth {
  name: string
  lastname: string
  email: string
  password: string
  token: string
}

const registerUser = async ({ name, lastname, email, password, token }: UserCreate): Promise<User> => {
  try {
    // Hash password
    const passHash = await encrypt(password)

    // Create user
    const registerUser = await UserModel.create({ name, lastname, email, password: passHash, token })
    return registerUser
  } catch (err) {
    throw new Error(err as string)
  }
}

const searchTokenAndDelete = async (token: string): Promise<User | null> => {
  try {
    const user = await UserModel.findOne({ token })
    if (user === null) {
      return null
    }
    await user.updateOne({ token: '' })
    return user as User
  } catch (err) {
    throw new Error(err as string)
  }
}

const searchToken = async (token: string): Promise<User | null> => {
  try {
    const usuario = await UserModel.findOne({ token })
    if (usuario === null) {
      return null
    }
    return usuario
  } catch (err) {
    throw new Error(err as string)
  }
}

export {
  registerUser,
  searchTokenAndDelete,
  searchToken
}
