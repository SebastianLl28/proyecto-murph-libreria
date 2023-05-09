import { Request, Response } from 'express'
import { addCategory, changeCategoryData, seachCategoryById, searchCategoryByName } from '../services/category.services'
import { listCategories } from '../helpers/category.helpers'
import { toTitleCase } from '../helpers/formatText'
import { formatDateBasic } from '../helpers/formatdate.helpers'
import { addDays, startOfDay, startOfMonth, startOfWeek } from 'date-fns'

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
    const newName = toTitleCase(name)
    await changeCategoryData(id, 'name', newName)
    res.redirect('/app/category')
  } catch (err) {
    throw new Error(err as string)
  }
}

const deleteCategoryPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    await changeCategoryData(id, 'active', false)
    res.redirect('/app/category')
  } catch (err) {
    throw new Error(err as string)
  }
}

const categorySearchGet = async (req: Request, res: Response): Promise<void> => {
  const { search, chkactive } = req.body
  console.log(req.body)

  const result = startOfDay(new Date())
  const result1 = addDays(startOfWeek(new Date()), 1)
  const result2 = startOfMonth(new Date())
  console.log(`result in start of day: ${formatDateBasic(result.toString())}`)
  console.log(`result in start of week: ${formatDateBasic(result1.toString())}`)
  console.log(`result in start of month: ${formatDateBasic(result2.toString())}`)

  const categories = await searchCategoryByName(search)
  const listCategories = Object.values(categories)

  const newList = listCategories.map((element) => {
    const { name, _id, active, createdAt } = element
    const date = formatDateBasic(createdAt)
    element.date = date
    const id = _id.toString()
    return { id, name, date, active }
  }).filter((element) => {
    if (chkactive === 'on') {
      return element
    }
    return element.active === true
  })

  res.render('app/category', {
    pagina: 'Category',
    categories: newList,
    // searchName: search
    search: { name: search, chkactive }
  })
}

const categoryNotFound = (_req: Request, res: Response): void => {
  res.redirect('/app/category')
}

export {
  addcategoryPost,
  editCategoryGet,
  editCategoryPost,
  categoryNotFound,
  categorySearchGet,
  deleteCategoryPost
}
