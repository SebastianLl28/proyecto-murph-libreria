import { Request, Response } from 'express'
import { addCategory } from '../services/category.services'

const addcategoryPost = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body
  await addCategory(name)
  console.log('category added')

  res.redirect('/app/category')
}

export {
  addcategoryPost
}
