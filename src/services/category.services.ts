import { Category } from '../interface/category.interface'
import CategoryModel from '../models/category'

const addCategory = async (name: string): Promise<Category> => {
  try {
    const newCategory = await CategoryModel.create({ name })
    return newCategory
  } catch (err) {
    throw new Error(err as string)
  }
}

const allCategories = async (): Promise< object > => {
  try {
    const categories = await CategoryModel.find({})
    return categories
  } catch (err) {
    throw new Error(err as string)
  }
}

export {
  addCategory,
  allCategories
}
