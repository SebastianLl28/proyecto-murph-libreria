import { ObjectId } from 'mongoose'
import { Auth } from './auth.inteface'

export interface User extends Auth {
  id: ObjectId
  name: string
  lastname: string
  token?: string
  confirmed?: boolean
}
