import { Request, Response } from 'express'
import { addCategory, changeCategoryData, seachCategoryById } from '../services/category.services'
import { listCategories } from '../helpers/category.helpers'

const addcategoryPost = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body
  await addCategory(name)
  console.log('category added')

  res.redirect('/app/category')
}

const editCategoryGet = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const categories = await listCategories()
  const categorieEdit = await seachCategoryById(id)

  if (categorieEdit == null) {
    return res.redirect('/app/category')
  }

  res.render('app/category', {
    pagina: 'Category',
    categories,
    categorieEdit,
    name: categorieEdit.name
  })
}

const editCategoryPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const { name } = req.body
    await changeCategoryData(id, 'name', name)
    res.redirect('/app/category')
  } catch (err) {
    throw new Error(err as string)
  }
}

const categoryNotFound = (_req: Request, res: Response): void => {
  res.redirect('/app/category')
}

export {
  addcategoryPost,
  editCategoryGet,
  editCategoryPost,
  categoryNotFound
}
