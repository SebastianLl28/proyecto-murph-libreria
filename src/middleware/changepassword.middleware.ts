import { NextFunction, Request, Response } from 'express'
import { check, validationResult } from 'express-validator'

const validationChangedPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { password } = req.body

  await check('password').notEmpty().withMessage('name is required').run(req)
  await check('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters').run(req)
  await check('repeatPassword').equals(password).withMessage('Passwords do not match').run(req)

  const result = validationResult(req)
  if (!result.isEmpty()) {
    return res.render('auth/change-password', {
      pagina: 'change Password',
      errors: result.array()
    }
    )
  }
  next()
}

export default validationChangedPassword
