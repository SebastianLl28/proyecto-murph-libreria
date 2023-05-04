import { Response } from 'express'
import { Request } from '../interface/request.interface'
import { User } from '../interface/user.interface'
import { allCategories } from '../services/category.services'
import { format } from 'date-fns'

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
  // list.forEach(element => {
  //   console.log(element)
  // })

  const newList = listCategories.map((element) => {
    const fechaMongo = new Date(element.createdAt)
    const date = format(fechaMongo, 'dd/MM/yyyy')
    element.date = date
    console.log(date)
    const { name } = element
    return { name, date }
  })

  console.log(newList)

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
