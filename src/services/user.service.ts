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

const searchUserbyId = async (id: ObjectId): Promise<User | null> => {
  try {
    const user = await UserModel.findById(id)
    if (user === null) {
      return null
    }
    return user
  } catch (err) {
    throw new Error('Error en searchUser')
  }
}

const findAllUsers = async (): Promise< object > => {
  const users = await UserModel.find({}).select('name lastname email -_id')
  // const transform = JSON.stringify(users, null, 2)
  return users
  // console.log(typeof transform)
}

export {
  changeUserConfirm,
  searchUserbyEmail,
  userIsConfirmed,
  userSetToken,
  changeUserData,
  searchUserbyId,
  findAllUsers
}
