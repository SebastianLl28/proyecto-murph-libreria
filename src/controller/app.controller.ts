import { Response } from 'express'
import { Request } from '../interface/request.interface'
import { User } from '../interface/user.interface'

const dashboard = (req: Request, res: Response): void => {
  const { name } = req.user as User
  res.render('app/dashboard', {
    pagina: 'Dashboard',
    name
  })
}

const category = (_req: Request, res: Response): void => {
  res.render('app/category', {
    pagina: 'Category'
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
