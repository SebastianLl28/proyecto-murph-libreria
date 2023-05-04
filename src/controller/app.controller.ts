import { Response } from 'express'
import { Request } from '../interface/request.interface'
import { User } from '../interface/user.interface'
import { allCategories } from '../services/category.services'
import { formatDateBasic } from '../helpers/formatdate.helpers'

const dashboard = (req: Request, res: Response): void => {
  const { name } = req.user as User
  res.render('app/dashboard', {
    pagina: 'Dashboard',
    name
  })
}

const category = async (_req: Request, res: Response): Promise<void> => {
  const categories = await allCategories()
  const listCategories = Object.values(categories)

  const newList = listCategories.map((element) => {
    const { name, _id, active, createdAt } = element
    const date = formatDateBasic(createdAt)
    element.date = date
    const id = _id.toString()
    return { id, name, date, active }
  }).filter((element) => {
    return element.active === true
  })

  res.render('app/category', {
    pagina: 'Category',
    categories: newList
  })
}

const product = (_req: Request, res: Response): void => {
  res.render('app/product', {
    pagina: 'Product'
  })
}

const supplier = (_req: Request, res: Response): void => {
  res.render('app/supplier', {
    pagina: 'Supplier'
  })
}

const users = (_req: Request, res: Response): void => {
  res.render('app/users', {
    pagina: 'Users'
  })
}

const customers = (_req: Request, res: Response): void => {
  res.render('app/customers', {
    pagina: 'Customer'
  })
}

const profile = (_req: Request, res: Response): void => {
  res.render('app/profile', {
    pagina: 'Profile'
  })
}

const signOff = (_req: Request, res: Response): void => {
  return res.clearCookie('_token').redirect('/auth/login')
}

export {
  dashboard,
  category,
  product,
  profile,
  users,
  customers,
  supplier,
  signOff
}
// https://materializecss.com/modals.html#!
