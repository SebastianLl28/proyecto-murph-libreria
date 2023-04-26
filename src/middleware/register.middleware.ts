import { NextFunction, Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import UserModel from '../models/user'

const validationRegister = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, lastname, email, password } = req.body

  await check('name').notEmpty().withMessage('name is required').run(req)
  await check('lastname').notEmpty().withMessage('lastname is required').run(req)
  await check('email').notEmpty().withMessage('email is required').run(req)
  await check('password').notEmpty().withMessage('password is required').run(req)
  await check('repeatPassword').equals(password).withMessage('Passwords do not match').run(req)

  await check('email').isEmail().withMessage('the email format is not correct').run(req)
  await check('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters long').run(req)

  const result = validationResult(req)

  // validar si los campos no estén vacios
  if (!result.isEmpty()) {
    return res.render('auth/register', {
      pagina: 'login',
      errors: result.array(),
      user: {
        name, lastname, email
      }
    })
  }

  // validar si se repite el password
  const checkEmail = await UserModel.findOne({ email })
  if (checkEmail != null) {
    console.log(checkEmail)
    return res.render('auth/register', {
      pagina: 'login',
      errors: [{ msg: 'The email is already registered', path: 'email' }],
      user: {
        name, lastname, email
      }
    })
  }

  next()
}

export {
  validationRegister
}
