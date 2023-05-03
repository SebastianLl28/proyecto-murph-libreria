import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { Request } from '../interface/request.interface'
import { searchUserbyId } from '../services/user.service'
import { User } from '../interface/user.interface'

const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { _token } = req.cookies
  if (_token === null) {
    res.redirect('/auth/login')
  }

  try {
    const decoded = jwt.verify(_token, process.env.SECRET_KEY as string)
    const { id } = decoded as jwt.JwtPayload
    const user = await searchUserbyId(id)
    if (user === null) {
      res.clearCookie('_token').redirect('/auth/login')
    }
    req.user = user as User
  } catch (err) {
    return res.clearCookie('_token').redirect('/auth/login')
  }
  next()
}

export default verifyToken
