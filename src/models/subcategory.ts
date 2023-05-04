import { Schema, model } from 'mongoose'
import { SubCategory } from '../interface/subcategory'

const subCategorySchema = new Schema<SubCategory>(
  {
    idCategory: {
      type: Schema.Types.ObjectId,
      ref: 'category'
    },
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

const SubCategoryModel = model('subcategory', subCategorySchema)
export default SubCategoryModel
