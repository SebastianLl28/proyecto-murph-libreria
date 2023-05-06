import { toTitleCase } from '../helpers/formatText'
import { Category } from '../interface/category.interface'
import CategoryModel from '../models/category'

const addCategory = async (name: string): Promise<Category> => {
  try {
    const newName = toTitleCase(name)
    const newCategory = await CategoryModel.create({ name: newName })
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

const verifyCategory = async (name: string): Promise<boolean> => {
  const category = await CategoryModel.findOne({ name })
  if (category === null) {
    return false
  }
  return true
}

const seachCategoryById = async (id: string): Promise<Category | null> => {
  try {
    const category = await CategoryModel.findById(id)
    if (category === null) {
      return null
    }
    return category
  } catch (err) {
    return null
  }
}

const changeCategoryData = async (id: string, prop: keyof Category, value: any): Promise<void> => {
  try {
    const update: any = {}
    update[prop] = value
    await CategoryModel.findByIdAndUpdate(id, update)
  } catch (err) {
    throw new Error(err as string)
  }
}

export {
  addCategory,
  allCategories,
  verifyCategory,
  seachCategoryById,
  changeCategoryData
}
