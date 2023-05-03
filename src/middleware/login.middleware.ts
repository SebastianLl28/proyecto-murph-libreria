import { NextFunction, Request, Response } from 'express'
import { check, validationResult } from 'express-validator'

const validationLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email } = req.body

  await check('email').notEmpty().withMessage('name is required').run(req)
  await check('password').notEmpty().withMessage('password is required').run(req)

  const result = validationResult(req)

  if (!result.isEmpty()) {
    return res.render('auth/login', {
      pagina: 'login',
      errors: result.array(),
      user: {
        email
      }
    })
  }

  next()
}

export default validationLogin
