import { ObjectId } from 'mongoose'
import UserModel from '../models/user'

import { User } from '../interface/user.interface'
const changeUserConfirm = async (id: ObjectId): Promise<void> => {
  const user = await UserModel.findById(id)
  if (user === null) {
    throw new Error('User not found')
  }
  user.confirmed = user.confirmed !== true
  await user.save()
}

const searchUserbyEmail = async (email: string): Promise<User | null> => {
  const usuario = await UserModel.findOne({ email })
  if (usuario === null) {
    return null
  }
  return usuario
}

const userIsConfirmed = async (id: ObjectId): Promise<boolean | null > => {
  try {
    const gaaa = await UserModel.findById(id)
    if (gaaa === null) {
      return null
    }
    return gaaa.confirmed as boolean
  } catch (err) {
    throw new Error(err as string)
  }
}

const userSetToken = async (id: ObjectId, token: string): Promise<void> => {
  await UserModel.findByIdAndUpdate(id, { token })
}

const changeUserData = async (id: ObjectId, prop: keyof User, value: any): Promise<void> => {
  try {
    const update: any = {}
    update[prop] = value
    const result = await UserModel.findByIdAndUpdate(id, update)
    console.log(result)
  } catch (err) {
    throw new Error('Error en changeUserData')
  }
}

const searchUserByData = async (prop: keyof User, value: any): Promise<User | null> => {
  const update: any = {}
  update[prop] = value
  const user = await UserModel.findOne(update)
  if (user === null) {
    return null
  }
  return user
}

export {
  changeUserConfirm,
  searchUserbyEmail,
  userIsConfirmed,
  userSetToken,
  changeUserData,
  searchUserByData
}
