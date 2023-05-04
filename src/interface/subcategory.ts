import { ObjectId } from 'mongoose'

export interface SubCategory {
  idCategory: ObjectId
  name: string
  active?: boolean
}
