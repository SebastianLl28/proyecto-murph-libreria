import { Schema, model } from 'mongoose'
import { Category } from '../interface/category.interface'

const categorySchema = new Schema<Category>(
  {
    name: {
      type: 'string',
      required: true
    },
    active: {
      type: 'boolean',
      required: true,
      default: true
    }
  }, {
    timestamps: true,
    versionKey: false
  })

const CategoryModel = model('category', categorySchema)
export default CategoryModel
