import { Request, Response } from 'express'
import { registerUser, searchToken, searchTokenAndDelete } from '../services/auth.services'
import { sendEmailPassword, sendMail } from '../config/emailer'
import { changeUserConfirm, changeUserData, searchUserbyEmail, searchUserbyId, userIsConfirmed, userSetToken } from '../services/user.service'
import createToken from '../helpers/createToken'
import { encrypt, verified } from '../helpers/bcrypt.handle'
import generatejwt from '../helpers/jwt.helpers'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const formLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { _token } = req.cookies
    if (_token === null) {
      console.log('gaaaaa')
      return res.render('auth/login', {
        pagina: 'Login'
      })
    }
    const decoded = jwt.verify(_token, process.env.SECRET_KEY as string)
    const { id } = decoded as jwt.JwtPayload
    const user = await searchUserbyId(id)
    if (user === null) {
      return res.clearCookie('_token').redirect('/auth/login')
    }
    return res.redirect('/app/dashboard')
  } catch (err) {
    return res.render('auth/login', {
      pagina: 'Login'
    })
  }
}

const formLoginPost = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body
  const user = await searchUserbyEmail(email)

  // si el usuario no se encuentra
  if (user === null) {
    return res.render('auth/login', {
      pagina: 'Login',
      user: { email },
      errors: [{ msg: 'the email or password is wrong' }]
    })
  }

  const isPasswordValid = await verified(password, user.password)

  // Si el password no councide
  if (!isPasswordValid) {
    return res.render('auth/login', {
      pagina: 'Login',
      user: { email },
      errors: [{ msg: 'the email or password is wrong' }]
    })
  }

  const { id, name } = user

  const token = generatejwt(id, name, email)

  return res.cookie('_token', token, {
    httpOnly: true
    // secure: true, // Cuando tienes sertificado SSL
    // sameSite: true // Cuando tienes sertificado SS
  }).redirect('/app/dashboard')
}

const formRegister = (_req: Request, res: Response): void => {
  res.render('auth/register', {
    pagina: 'Register acount'
  })
}

const formRegisterPost = async (req: Request, res: Response): Promise<void> => {
  const { name, lastname, email, password } = req.body
  const newToken = createToken()
  try {
    const user = { name, lastname, email, password, token: newToken }
    const newUser = registerUser(user)
    console.log(newUser)
  } catch (error) {
    console.log(error)
  }

  // Enviar mensaje a correo
  try {
    await sendMail({ name, lastname, email, token: newToken })
  } catch (error) {
    throw new Error(error as string)
  }

  // Message confirmation
  res.render('messages/confirmCount', {
    pagina: 'Message Confirmation',
    msg: 'We send you a Confirmation Email'
  })
}

const formRecoverPassword = (_req: Request, res: Response): void => {
  res.render('auth/recover-password', {
    pagina: 'Recover Password'
  })
}

const formRecoverPasswordPost = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body
  const usuario = await searchUserbyEmail(email)
  // Buscar email | si no se encuentra ...
  if (usuario === null) {
    return res.render('auth/recover-password', {
      pagina: 'Message Confirmation',
      errors: [{ msg: 'the email is not registered', path: 'email' }]
    })
  }

  const isConfirmed = await userIsConfirmed(usuario.id)
  if (isConfirmed === false) {
    return res.render('auth/recover-password', {
      pagina: 'Message Confirmation',
      errors: [{ msg: 'the email is not registered', path: 'email' }]
    })
  }

  const { name, lastname } = usuario
  const newToken = createToken()
  await userSetToken(usuario.id, newToken)

  try {
    await sendEmailPassword({ name, lastname, email, token: newToken })
  } catch (err) {
    throw new Error(err as string)
  }

  res.render('messages/confirmCount', {
    pagina: 'Message Confirmation',
    msg: 'A message was sent to your email to change your password 😬😬😬'
  })
}

const confirmationAccount = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.params
  const user = await searchTokenAndDelete(token)
  if (user === null) {
    return res.render('messages/confirmCount', {
      pagina: 'Message Confirmation',
      msg: 'Token is not valid or has expired 😢😢😢'
    })
  }

  // Change state of confirmation
  await changeUserConfirm(user.id)

  // Change state of confirmation
  res.render('messages/confirmCount', {
    pagina: 'Message Confirmation',
    msg: 'We send you a Confirmation Email, click on the following link to log in',
    confirm: true
  })
}

const formChangePassword = async (req: Request, res: Response): Promise<void> => {
  // Validar que el token existe | si no existe mandar a mensajes diciendo que no se puede
  const { token } = req.params
  console.log(token)
  const user = await searchToken(token)

  if (user === null) {
    return res.render('messages/confirmCount', {
      pagina: 'Message Confirmation',
      msg: 'Token is not valid or has expired 😢😢😢'
    })
  }
  // validar si está registrado el usuario| si no mandar mensaje que no existe
  const isConfirmed = await userIsConfirmed(user.id)
  if (isConfirmed === false) {
    return res.render('messages/confirmCount', {
      pagina: 'Message Confirmation',
      msg: 'Token is not valid or has expired 😢😢😢'
    })
  }

  res.render('auth/change-password', {
    pagina: 'Change Password'
  })
}

const formChangePasswordPost = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.params
  const { password } = req.body
  const user = await searchTokenAndDelete(token)
  if (user === null) {
    throw new Error('Error in change password')
  }

  const newPassword = await encrypt(password)

  await changeUserData(user.id, 'password', newPassword)
  res.render('messages/confirmCount', {
    pagina: 'Message Confirmation',
    msg: 'Your password has been changed ✨✨, click on the following link to log in',
    confirm: true
  })
}

export {
  formLogin,
  formLoginPost,
  formRegister,
  formRegisterPost,
  formRecoverPassword,
  formRecoverPasswordPost,
  confirmationAccount,
  formChangePassword,
  formChangePasswordPost
}

// https://mongoosejs.com/docs/typescript.html#objectids-and-other-mongoose-types -> Object's relation
