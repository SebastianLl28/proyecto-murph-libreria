import { Request, Response } from 'express'

const formLogin = (_req: Request, res: Response): void => {
  res.render('auth/login', {
    pagina: 'Login'
  })
}

export {
  formLogin
}
